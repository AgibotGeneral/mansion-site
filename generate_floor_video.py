import os
import cv2
import numpy as np
import compress_json as cj
import imageio
from ai2thor.controller import Controller
from ai2thor.hooks.procedural_asset_hook import ProceduralAssetHookRunner
import ai2thor.wsgi_server
import sys
import argparse
import copy

# Constants based on the environment found
OBJATHOR_ASSETS_DIR = "/home/agiuser/.objathor-assets/2023_09_23/assets"
THOR_EXECUTABLE_PATH = "/home/agiuser/.ai2thor/releases/thor-Linux64-local/thor-Linux64-local/thor-Linux64-local"

def generate_video(floor_json_path, output_path, num_frames=120, fps=30, width=800, height=600):
    """
    Reads a floor JSON and generates an orbital rotating view video using imageio.
    """
    if not os.path.exists(floor_json_path):
        print(f"Error: {floor_json_path} not found.")
        return

    print(f"Loading scene: {floor_json_path}")
    scene = cj.load(floor_json_path)
    
    print("Starting AI2-THOR controller...")
    controller = Controller(
        local_executable_path=THOR_EXECUTABLE_PATH,
        start_unity=True,
        scene='Procedural',
        gridSize=0.2,
        width=width,
        height=height,
        server_class=ai2thor.wsgi_server.WsgiServer,
        makeAgentsVisible=True,
        visibilityScheme='Distance',
        # 增加全局可见性距离，防止远处的物体不被加载或渲染
        visibilityDistance=100.0,
        action_hook_runner=ProceduralAssetHookRunner(
            asset_directory=OBJATHOR_ASSETS_DIR, asset_symlink=True, verbose=False
        ),
    )
    
    print("Creating house...")
    controller.step(action='CreateHouse', house=scene, raise_for_failure=True)
    controller.step(action='Pass', raise_for_failure=True)
    
    # Get scene bounds
    event = controller.step(action='GetMapViewCameraProperties', raise_for_failure=True)
    bounds = event.metadata['sceneBounds']
    center = bounds['center']
    size = bounds['size']
    
    # Orbital parameters
    max_dim = max(size['x'], size['z'])
    orbit_radius = max_dim * 0.8
    orbit_height = max_dim * 0.8
    
    target_y = 0 
    
    frames = []
    
    print(f"Rendering {num_frames} frames in orbital view...")
    
    for i in range(num_frames):
        angle_deg = (i / num_frames) * 360
        angle_rad = np.deg2rad(angle_deg)
        
        cam_x = center['x'] + orbit_radius * np.cos(angle_rad)
        cam_z = center['z'] + orbit_radius * np.sin(angle_rad)
        cam_y = target_y + orbit_height
        
        pitch = np.rad2deg(np.arctan2(orbit_height, orbit_radius))
        dx = center['x'] - cam_x
        dz = center['z'] - cam_z
        yaw = np.rad2deg(np.arctan2(dx, dz))
        
        if i == 0:
            event = controller.step(
                action="AddThirdPartyCamera",
                position={"x": cam_x, "y": cam_y, "z": cam_z},
                rotation={"x": pitch, "y": yaw, "z": 0},
                fieldOfView=60,
                # 设置天空盒颜色为纯白
                skyboxColor="white",
                # 设置很大的远裁剪平面，确保能看到整个场景
                farClippingPlane=200.0,
                nearClippingPlane=0.01
            )
        else:
            event = controller.step(
                action="UpdateThirdPartyCamera",
                thirdPartyCameraId=0,
                position={"x": cam_x, "y": cam_y, "z": cam_z},
                rotation={"x": pitch, "y": yaw, "z": 0},
                # 更新时也要确保参数一致
                farClippingPlane=200.0
            )
            
        frame = event.third_party_camera_frames[0]
        # imageio expects RGB, AI2-THOR returns RGB
        frames.append(frame)
        
        if (i + 1) % 20 == 0:
            print(f"Processed {i+1}/{num_frames} frames")
            
    # Compile video using imageio
    print(f"Compiling video to {output_path} using imageio (H.264)...")
    try:
        # Using imageio with ffmpeg plugin for better H.264 support
        writer = imageio.get_writer(output_path, fps=fps, codec='libx264', quality=8)
        for f in frames:
            writer.append_data(f)
        writer.close()
        print(f"Success! Video saved as {output_path}")
    except Exception as e:
        print(f"Error writing video with imageio: {e}")
        # Fallback to saving frames if it fails
        print("Saving frames as images in 'temp_frames/' as fallback...")
        os.makedirs("temp_frames", exist_ok=True)
        for idx, f in enumerate(frames):
            imageio.imwrite(f"temp_frames/frame_{idx:04d}.png", f)

    controller.stop()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate a rotating orbital view video using imageio.")
    parser.add_argument("--floor", type=str, default="floor5", help="Floor name prefix")
    parser.add_argument("--output", type=str, default=None, help="Output video filename")
    parser.add_argument("--frames", type=int, default=120, help="Number of frames")
    parser.add_argument("--fps", type=int, default=30, help="FPS")
    parser.add_argument("--width", type=int, default=800, help="Width")
    parser.add_argument("--height", type=int, default=600, help="Height")
    
    args = parser.parse_args()
    
    floor_file = os.path.join("scenedata", f"{args.floor}.json")
    output_video = args.output if args.output else f"{args.floor}_rotation.mp4"
    
    generate_video(
        floor_file, 
        output_video, 
        num_frames=args.frames, 
        fps=args.fps, 
        width=args.width, 
        height=args.height
    )
