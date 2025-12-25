import os
import re
import imageio.v3 as iio
import imageio

def create_video_from_frames(frame_dir, output_video, fps=30):
    # Get all png files in the directory
    images = [f for f in os.listdir(frame_dir) if f.endswith('.png')]
    
    # Sort images by the frame number in the filename
    def get_frame_num(filename):
        match = re.search(r'frame_(\d+)', filename)
        return int(match.group(1)) if match else -1

    images.sort(key=get_frame_num)
    
    if not images:
        print(f"No images found in {frame_dir}")
        return

    print(f"Creating video {output_video} from {len(images)} frames using imageio (H.264)...")
    
    try:
        # Using imageio with libx264 for high compatibility
        writer = imageio.get_writer(output_video, fps=fps, codec='libx264', quality=8)
        
        for i, image_name in enumerate(images):
            image_path = os.path.join(frame_dir, image_name)
            # Read image
            frame = iio.imread(image_path)
            writer.append_data(frame)
            
            if (i + 1) % 50 == 0:
                print(f"Processed {i+1}/{len(images)} frames")
        
        writer.close()
        print(f"Video saved as {output_video}")
        print("This version uses H.264 codec and should be compatible with browsers.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    FRAME_DIR = "saved_frames"
    OUTPUT_VIDEO = "output_video.mp4"
    FPS = 5
    
    create_video_from_frames(FRAME_DIR, OUTPUT_VIDEO, FPS)
