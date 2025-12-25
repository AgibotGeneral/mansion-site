import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';

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
              Multi-floor lANguage-to-3D Scene generatIOn for loNg-horizon tasks
            </p>

            <div className="mansionButtons">
              <Link className="button button--primary button--lg" to="/docs/getting-started/quickstart">
                Quickstart
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/api/overview">
                API reference
              </Link>
              <Link className="button button--outline button--lg" to="/docs/dataset/mansionworld">
                MansionWorld dataset
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="mansionHeroDetails">
        <div className="container">
          <div className="mansionHeroGrid">
            <div>
              <div className="mansionKicker">Embodied AI · Multi-floor · Long-horizon</div>
              <div className="mansionMeta">
                <span className="pill">Multi-floor buildings</span>
                <span className="pill">Stairs & elevators</span>
                <span className="pill">Task-level skills</span>
                <span className="pill">Language-conditioned scenes</span>
              </div>
            </div>

            {/* Right column */}
            <div>
              {/* Drag-to-rotate preview */}
              <div className="mansionCard">
                <div className="mansionCardHeader">Interactive preview</div>

                <BrowserOnly fallback={<div style={{ height: 360 }} />}>
                  {() => {
                    const DragRotateViewer = require('../components/DragRotateViewer').default;
                    return <DragRotateViewer height={360} />;
                  }}
                </BrowserOnly>

                <div className="mansionCardFooter">
                  <Link to="/docs/dataset/mansionworld">See MansionWorld</Link> ·{' '}
                  <Link to="/docs/environment/overview">See environment</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    { title: 'A three-story luxury villa equipped with entertainment and exercise facilities', img: '/img/dataset/villa.png' },
    { title: 'A large-scale hospital', img: '/img/dataset/hospital.png' },
    { title: 'A high school building', img: '/img/dataset/high_school.png' },
    { title: 'A four story office building', img: '/img/dataset/office.png' },
    { title: 'A entertainment complex', img: '/img/dataset/entertainment.png' },
    { title: 'A compact apartment designed for two people', img: '/img/dataset/apartment.png' },
  ];

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
              <img src="/img/dataset/distribution.png" alt="Distribution" />
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

        <div className="text--center margin-top--lg">
          <Link className="button button--secondary button--lg" to="/docs/dataset/mansionworld">
            Explore full dataset metadata
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
      <DatasetPreview />
      <main className="container margin-vert--lg">
        <section className="row">
          <Feature title="MansionWorld">
            A large-scale collection of multi-floor buildings with
            realistic room connectivity, object distributions, and cross-floor semantics.
          </Feature>
          <Feature title="MansionGym">
            A reproducible wrapper for running multi-floor episodes,
            managing floor transitions, and tracking object state across floors.
          </Feature>
          <Feature title="Skills API">
            A clean, testable layer of *high-level* skills (stairs, elevators, navigation,
            object interaction) designed for long-horizon planning.
          </Feature>
        </section>

        <section className="row margin-top--lg">
          <div className="col col--6">
            <div className="callout">
              <h2>Read the docs like an API reference</h2>
              <p>
                The docs are organized around <b>concepts</b>, <b>environment state</b>, and a
                structured <b>skills</b> interface. If you like iTHOR’s API reference style,
                start here:
              </p>
              <div className="mansionButtons">
                <Link className="button button--primary" to="/docs/api/overview">API overview</Link>
                <Link className="button button--secondary" to="/docs/environment/observations">Observations</Link>
                <Link className="button button--secondary" to="/docs/skills/overview">Skills</Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className="callout">
              <h2>Reproduce results</h2>
              <p>
                This repo is structured so that <b>dataset download</b>, <b>environment setup</b>, and
                <b>evaluation</b> are explicit and versioned. See:
              </p>
              <div className="mansionButtons">
                <Link className="button button--secondary" to="/docs/dataset/mansionworld">Dataset</Link>
                <Link className="button button--secondary" to="/docs/getting-started/installation">Installation</Link>
                <Link className="button button--secondary" to="/docs/project/citation">Citation</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
