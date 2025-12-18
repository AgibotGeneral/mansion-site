import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';

function Hero() {
  return (
    <header className="mansionHero">
      <div className="container">
        <div className="mansionHeroGrid">
          <div>
            <div className="mansionKicker">Embodied AI · Multi-floor · Long-horizon</div>
            <h1 className="mansionTitle">MANSION</h1>
            <p className="mansionSubtitle">
              Multi-floor language-to-3D scene generation for long-horizon tasks,
              with an open dataset, a reproducible simulator wrapper, and a skills API.
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

            <div style={{ height: 16 }} />

            {/* Minimal example (your existing card) */}
            <div className="mansionCard">
              <div className="mansionCardHeader">Minimal example</div>
              <pre className="mansionCode"><code>{`# Example only — adjust imports to your package structure
from mansion_gym import MansionEnv

env = MansionEnv(scene_id="mansion_000123", floor=1)
obs = env.reset()

# High-level skill call (task code stays clean)
env.step_skill("go_near_object", object_id="Mug|+00.12|+00.88|-01.35")
env.step_skill("pickup_object", object_id="Mug|+00.12|+00.88|-01.35")

# Multi-floor transition
env.step_skill("take_stairs", target_floor=2)

# Use obs["rgb"], obs["depth"], obs["metadata"] ...
`}</code></pre>
              <div className="mansionCardFooter">
                <Link to="/docs/api/env">See `MansionEnv`</Link> ·{' '}
                <Link to="/docs/skills/overview">See skills</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
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

export default function Home() {
  return (
    <Layout
      title="MANSION"
      description="Multi-floor language-to-3D scene generation for long-horizon embodied tasks"
    >
      <Hero />
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
