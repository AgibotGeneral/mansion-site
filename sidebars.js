/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    "intro",
    {
      type: "category",
      label: "Getting started",
      collapsible: false,
      collapsed: false,
      link: { type: "doc", id: "getting-started/installation" },
      items: [
        "getting-started/installation",
        "getting-started/quickstart",
        "getting-started/faq",
      ],
    },
    {
      type: "category",
      label: "Core concepts",
      collapsible: false,
      collapsed: false,
      link: { type: "doc", id: "concepts/what-is-mansion" },
      items: [
        "concepts/what-is-mansion",
        "concepts/multi-floor-world",
        "concepts/task-format",
      ],
    },
    {
      type: "category",
      label: "Dataset",
      collapsible: false,
      collapsed: false,
      link: { type: "doc", id: "dataset/mansionworld" },
      items: [
        "dataset/mansionworld",
        "dataset/scenes-and-assets",
        "dataset/annotations",
      ],
    },
    {
      type: "category",
      label: "Environment",
      collapsible: false,
      collapsed: false,
      link: { type: "doc", id: "environment/initialization" },
      items: [
        "environment/initialization",
        "environment/observations",
        "environment/scene-loading",
        "environment/object-state",
      ],
    },
    {
      type: "category",
      label: "API reference",
      collapsible: false,
      collapsed: false,
      link: { type: "doc", id: "api/overview" },
      items: ["api/overview", "api/env", "api/skills"],
    },
    {
      type: "category",
      label: "Project",
      collapsible: false,
      collapsed: false,
      link: { type: "doc", id: "project/citation" },
      items: ["project/citation", "project/changelog", "project/license"],
    },
  ],
};

module.exports = sidebars;
