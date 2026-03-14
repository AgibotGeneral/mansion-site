import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';

function InteractiveShowcase() {
  const [activeFloor, setActiveFloor] = useState(1);
  const floors = [1, 2, 3, 4, 5, 6];
  const buildingImg = useBaseUrl('/img/building.webp');
  const floorVideo = useBaseUrl(`/video/floor${activeFloor}_rotation.mp4`);
  const taskVideo = useBaseUrl('/video/output_video.mp4');
  const floorVideoRef = useRef(null);

  useEffect(() => {
    if (floorVideoRef.current) {
      floorVideoRef.current.playbackRate = 0.5;
    }
  }, [activeFloor]);

  return (
    <section className="mansionShowcase">
      <div className="container">
        <div className="mansionSectionHeader">
          <h2>Meet MANSION</h2>
          <p className="mansionDescription">
            Generate building-scale, multi-floor 3D interactive worlds from a single natural-language prompt, and explore MansionWorld with 1,000+ buildings. Bring your embodied agents and train at scale!
          </p>
        </div>

        <div className="row">
          {/* Left Column: Building Map & Floor Selection */}
          <div className="col col--3">
            <div className="mansionShowcaseCard">
              <div className="mansionShowcaseHeader">Building Map</div>
              <div className="mansionBuildingSection">
                <p className="mansionSelectorHint">Click to switch floor preview:</p>
                <div className="mansionBuildingLayout">
                  <div className="mansionFloorMarkers">
                    {floors.slice().reverse().map((f) => (
                      <button
                        key={f}
                        className={`mansionFloorMarkerItem ${activeFloor === f ? 'active' : ''}`}
                        onClick={() => setActiveFloor(f)}
                      >
                        <span className="mansionMarkerCircle">
                          <span className="mansionMarkerNumber">{f}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mansionBuildingImgContainer">
                    <img src={buildingImg} alt="Building Diagram" className="mansionBuildingImg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Floor Video (Wider) */}
          <div className="col col--5">
            <div className="mansionShowcaseCard">
              <div className="mansionShowcaseHeader">Floor {activeFloor} Preview</div>
              <div className="mansionVideoContainer wide">
                <video
                  key={`floor-${activeFloor}`}
                  ref={floorVideoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="mansionVideo"
                >
                  <source src={floorVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Right Column: Task Video */}
          <div className="col col--4">
            <div className="mansionShowcaseCard">
              <div className="mansionShowcaseHeader">Long-Horizon Task</div>
              <div className="mansionVideoContainer">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="mansionVideo"
                >
                  <source src={taskVideo} type="video/mp4" />
                </video>
              </div>
              <div className="mansionTaskDescription">
                "Starting from the 3th floor, go to the 1st floor to pick up my noodle delivery, then put it into the refrigerator in the 4th floor dining area."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <>
      <header className="mansionHero">
        <div className="container">
          <div className="mansionHeroHeader">
            <h1 className="mansionTitle">
              MANSION
            </h1>
            <p className="mansionSubtitle">
              <b>M</b>ulti-floor l<b>AN</b>guage-to-3D <b>S</b>cene generat<b>IO</b>n for lo<b>N</b>g-horizon tasks
            </p>

            <div className="mansionAuthors">
              <p className="mansionAuthorLine">
                Lirong Che<sup>*,1,2</sup>&ensp;
                Shuo Wen<sup>*,3,§</sup>&ensp;
                Shan Huang<sup>1</sup>&ensp;
                Chuang Wang<sup>2</sup>
              </p>
              <p className="mansionAuthorLine">
                Yuzhe Yang<sup>2</sup>&ensp;
                Gregory Dudek<sup>3</sup>&ensp;
                Xueqian Wang<sup>†,1</sup>&ensp;
                Jian Su<sup>†,2</sup>
              </p>
              <p className="mansionAffiliationLine">
                <sup>1</sup>Tsinghua University&emsp;
                <sup>2</sup>AgiBot&emsp;
                <sup>3</sup>McGill University, MILA – Quebec AI Institute
              </p>
              <p className="mansionFootnoteLine">
                * Equal contribution.&ensp;† Corresponding authors.<br />§ Work done during an internship at AgiBot.
              </p>
            </div>

            <div className="mansionLinkButtons">
              <a className="mansionLinkBtn" href="#" aria-disabled="true">
                <span>📄</span> Paper
              </a>
              <a className="mansionLinkBtn" href="https://arxiv.org/abs/2603.11554" target="_blank" rel="noopener noreferrer">
                <span>📝</span> arXiv
              </a>
              <a className="mansionLinkBtn" href="https://github.com/AgibotGeneral/MANSION" target="_blank" rel="noopener noreferrer">
                <span>🐙</span> Code
              </a>
              <a className="mansionLinkBtn" href="https://huggingface.co/datasets/superbigsaw/MansionWorld" target="_blank" rel="noopener noreferrer">
                <span>🤗</span> Dataset
              </a>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}

function Feature({ title, children }) {
  return (
    <div className="col col--4">
      <div className="featureCard">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

function DatasetPreview() {
  const scenes = [
    { title: 'A three-story luxury villa equipped with entertainment and exercise facilities', img: useBaseUrl('/img/dataset/villa.webp') },
    { title: 'A large-scale hospital', img: useBaseUrl('/img/dataset/hospital.webp') },
    { title: 'A high school building', img: useBaseUrl('/img/dataset/high_school.webp') },
    { title: 'A four story office building', img: useBaseUrl('/img/dataset/office.webp') },
    { title: 'A entertainment complex', img: useBaseUrl('/img/dataset/entertainment.webp') },
    { title: 'A compact apartment designed for two people', img: useBaseUrl('/img/dataset/apartment.webp') },
  ];
  const distributionImg = useBaseUrl('/img/dataset/distribution.webp');

  return (
    <section className="mansionDatasetPreview">
      <div className="container">
        <div className="mansionSectionHeader">
          <h2>MansionWorld Dataset</h2>
          <p className="mansionDescription">
            MansionWorld contains 1000+ interactive multi-floor buildings, covering 2–10 floors and 10,000+ rooms in total, including non-residential environments such as offices, hospitals, schools, and supermarkets.
          </p>
        </div>

        {/* Distribution row */}
        <div className="row margin-bottom--md">
          <div className="col col--10 col--offset-1">
            <div className="mansionDistributionFull">
              <img src={distributionImg} alt="Distribution" />
            </div>
          </div>
        </div>

        <div className="mansionSectionSubHeader">
          <h3>Sample Scenes Preview</h3>
          <p>A selection of diverse environments available in the dataset.</p>
        </div>

        {/* Scenes grid - 2 per row */}
        <div className="mansionSceneGridTwoUp">
          {scenes.map((scene, idx) => (
            <div key={idx} className="mansionSceneItem">
              <div className="mansionSceneImageContainer">
                <img src={scene.img} alt={scene.title} />
              </div>
              <div className="mansionSceneInfoCenter">
                <p className="mansionSingleLineTitle">{scene.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mansionButtons text--center margin-top--lg">
          <Link className="button button--primary button--lg" to="/docs/getting-started/quickstart">
            Quickstart
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/api/overview">
            API reference
          </Link>
          <Link className="button button--outline button--lg mansionButtonGray" to="/docs/dataset/mansionworld">
            MansionWorld dataset
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="MANSION"
      description="Multi-floor language-to-3D scene generation for long-horizon embodied tasks"
    >
      <Hero />
      <InteractiveShowcase />
      <DatasetPreview />
      <main className="container margin-vert--lg">
        <section className="mansionCitationSection">
          <h2>Citation</h2>
          <p>If you use MANSION in your research, please cite:</p>
          <pre className="mansionBibTeX"><code>{`@misc{che2026mansionmultifloorlanguageto3dscene,
  title         = {MANSION: Multi-floor lANguage-to-3D Scene generatIOn for loNg-horizon tasks},
  author        = {Lirong Che and Shuo Wen and Shan Huang and Chuang Wang and Yuzhe Yang and Gregory Dudek and Xueqian Wang and Jian Su},
  year          = {2026},
  eprint        = {2603.11554},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CV},
  url           = {https://arxiv.org/abs/2603.11554},
}`}</code></pre>
        </section>
      </main>
    </Layout>
  );
}
