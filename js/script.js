"use strict";

import {
  ME,
  ABOUT_ME,
  INTERESTS,
  DESKTOP_README,
  CV,
  PROJECTS,
  GALLERY,
  NOTES,
  WIDGETS
} from "./data.js";

const desktop = document.getElementById("desktop");
const menuLayer = document.getElementById("menu-layer");
const dock = document.querySelector(".dock");
const openWindows = new Map();

let highestZIndex = 20;
let activeMenu = null;

const viewState = {
  important: true,
  projects: true,
  dock: true,
};

const clamp = (value, min, max) =>
  Math.max(min, Math.min(max, value));

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );

const cloneSvgTemplate = (id) =>
  document
    .getElementById(id)
    .content.firstElementChild.cloneNode(true);

const REFERENCE_DESKTOP = {
  width: 1536,
  height: 1024,
};

function scaleDesktopPosition(x, y) {
  const usableHeight = Math.max(600, window.innerHeight - 30);

  return {
    x: Math.round(
      clamp(
        (x / REFERENCE_DESKTOP.width) * window.innerWidth,
        12,
        window.innerWidth - 108,
      ),
    ),

    y: Math.round(
      clamp(
        (y / REFERENCE_DESKTOP.height) * usableHeight,
        8,
        usableHeight - 125,
      ),
    ),
  };
}

const importantIconPositions = {
  about: { x: 250, y: 420 },
  cv: { x: 115, y: 540 },
  swot: { x: 175, y: 655 },

  // README stays in the middle of the desktop.
  readme: {
    x: REFERENCE_DESKTOP.width / 2 - 48,
    y: REFERENCE_DESKTOP.height / 2 - 70,
  },
};

const projectPositions = [
  { x: 1035, y: 95 },
  { x: 1135, y: 270 },
  { x: 1245, y: 345 },
  { x: 1205, y: 550 },
  { x: 1375, y: 550 },
  { x: 1045, y: 625 },
  { x: 1275, y: 705 },
  { x: 1410, y: 815 },
];

const baseIcons = [
  {
    id: "about",
    label: "About Me.txt",
    group: "important",
    art: () => cloneSvgTemplate("svg-doc"),
  },
  {
    id: "cv",
    label: "CV.pdf",
    group: "important",
    art: () => cloneSvgTemplate("svg-cv"),
  },
  {
    id: "swot",
    label: "SWOT.pdf",
    group: "important",
    art: () => cloneSvgTemplate("svg-doc"),
  },
  {
    id: "readme",
    label: "README.md",
    group: "important",
    art: () => cloneSvgTemplate("svg-doc"),
  },
];

function importantIconPosition(id) {
  const position = importantIconPositions[id];

  if (!position) {
    return { x: 32, y: 45 };
  }

  return scaleDesktopPosition(position.x, position.y);
}

function projectPosition(index) {
  const fallback = {
    x: 1050 + (index % 3) * 145,
    y: 100 + Math.floor(index / 3) * 150,
  };

  const position = projectPositions[index] ?? fallback;

  return scaleDesktopPosition(position.x, position.y);
}

const icons = baseIcons.map((icon) => ({
  ...icon,
  ...importantIconPosition(icon.id),
}));

PROJECTS.forEach((project, index) => {
  const position = projectPosition(index);

  icons.push({
    id: `project-${index}`,
    label: project.name,
    group: "projects",
    x: position.x,
    y: position.y,
    art: () => cloneSvgTemplate("svg-folder"),
  });
});

function isMobileLayout() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function getMobileIconPosition(index) {
  const screenWidth = window.innerWidth;

  const columns = screenWidth < 380 ? 3 : 4;
  const iconWidth = 78;
  const rowHeight = 105;

  const availableSpace = screenWidth - columns * iconWidth;
  const gap = Math.max(3, availableSpace / (columns + 1));

  const column = index % columns;
  const row = Math.floor(index / columns);

  return {
    x: Math.round(gap + column * (iconWidth + gap)),
    y: 18 + row * rowHeight,
  };
}

function renderDesktopIcons() {
  desktop.innerHTML = "";

  icons.forEach((icon, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "icon";
    button.dataset.id = icon.id;
    button.dataset.group = icon.group;
    button.setAttribute(
      "aria-label",
      `Open ${icon.label}`,
    );

    const position = isMobileLayout()
      ? getMobileIconPosition(index)
      : {
          x: icon.x,
          y: icon.y + 30,
        };

    button.style.left = `${position.x}px`;
    button.style.top = `${position.y}px`;

    button.appendChild(icon.art());

    const label = document.createElement("span");

    label.className = "label";
    label.textContent = icon.label;

    button.appendChild(label);
    desktop.appendChild(button);

    makeIconDraggable(button, icon);

    // One tap opens files and folders on mobile.
    button.addEventListener("click", () => {
      if (isMobileLayout()) {
        openWindow(icon.id);
      }
    });

    // Double-click remains for desktop and MacBook.
    button.addEventListener("dblclick", () => {
      if (!isMobileLayout()) {
        openWindow(icon.id);
      }
    });

    button.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        openWindow(icon.id);
      }
    });
  });

  applyViewState();
}

function makeIconDraggable(button, icon) {
  // Disable icon dragging on phones.
  if (isMobileLayout()) {
    return;
  }

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();

    document
      .querySelectorAll(".icon.selected")
      .forEach((element) => element.classList.remove("selected"));

    button.classList.add("selected");

    const startX = event.clientX;
    const startY = event.clientY;
    const originalX = icon.x;
    const originalY = icon.y;

    const move = (moveEvent) => {
      icon.x = clamp(
        originalX + moveEvent.clientX - startX,
        0,
        window.innerWidth - 96,
      );

      icon.y = clamp(
        originalY + moveEvent.clientY - startY,
        2,
        window.innerHeight - 145,
      );

      button.style.left = `${icon.x}px`;
      button.style.top = `${icon.y + 30}px`;
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  });
}

function resetLayout() {
  usedDesktopPositions.length = 0;

  baseIcons.forEach((baseIcon, index) => {
    const position = randomDesktopPosition();

    icons[index].x = position.x;
    icons[index].y = position.y;
  });

  PROJECTS.forEach((_, index) => {
    const position = projectPosition();

    Object.assign(
      icons[baseIcons.length + index],
      position,
    );
  });

  renderDesktopIcons();

  document
    .querySelectorAll(".desktop-widget")
    .forEach((widget) => {
      const size = {
        profile: { width: 330, height: 125 },
        thought: { width: 240, height: 90 },
        sticky: { width: 230, height: 220 },
        player: { width: 390, height: 120 },
      }[widget.dataset.widget];

      if (!size) {
        return;
      }

      const position = randomDesktopPosition({
        width: size.width,
        height: size.height,
        spacing: 22,
      });

      widget.style.left = `${position.x}px`;
      widget.style.top = `${position.y}px`;
      widget.style.right = "auto";
      widget.style.bottom = "auto";
    });

  showToast("Desktop layout randomized");
}



function applyViewState() {
  document
    .querySelectorAll('.icon[data-group="important"]')
    .forEach((element) => {
      element.classList.toggle(
        "hidden-group",
        !viewState.important,
      );
    });

  document
    .querySelectorAll('.icon[data-group="projects"]')
    .forEach((element) => {
      element.classList.toggle(
        "hidden-group",
        !viewState.projects,
      );
    });

  dock.classList.toggle("hidden", !viewState.dock);
}

function openWindow(id) {
  if (openWindows.has(id)) {
    const windowElement = openWindows.get(id);

    windowElement.style.display = "flex";
    focusWindow(id);
    return;
  }

  const specification = buildWindow(id);

  if (!specification) {
    return;
  }


  const windowElement = document.createElement("section");

  windowElement.className = "window";
  windowElement.dataset.id = id;

  const width = Math.min(
    specification.width,
    window.innerWidth - 32,
  );

  const height = Math.min(
    specification.height,
    window.innerHeight - 85,
  );

  const offset = openWindows.size * 22;

  Object.assign(windowElement.style, {
    width: `${width}px`,
    height: `${height}px`,
    left: `${Math.max(
      12,
      (window.innerWidth - width) / 2 +
        (offset % 110) -
        55,
    )}px`,
    top: `${Math.max(
      38,
      (window.innerHeight - height) / 2 +
        (offset % 90) -
        40,
    )}px`,
    zIndex: ++highestZIndex,
  });

  windowElement.innerHTML = `
    <div class="titlebar">
      <button
        class="tb-btn tb-close"
        aria-label="Close"
      ></button>

      <button
        class="tb-btn tb-min"
        aria-label="Minimize"
      ></button>

      <button
        class="tb-btn tb-max"
        aria-label="Maximize"
      ></button>

      <div class="tb-title"></div>
      <div class="tb-spacer"></div>
    </div>

    <div class="content"></div>
  `;

  windowElement.querySelector(".tb-title").textContent =
    specification.title;

  windowElement.querySelector(".content").innerHTML =
    specification.html;

  document.body.appendChild(windowElement);
  openWindows.set(id, windowElement);

  addWindowControls(windowElement, id);
  makeWindowDraggable(windowElement);

  if (id === "notes") {
    initializeNotes(windowElement);
  }

  focusWindow(id);
  closeMenu();
}

function addWindowControls(windowElement, id) {
  windowElement.querySelector(".tb-close").onclick = (event) => {
    event.stopPropagation();
    windowElement.remove();
    openWindows.delete(id);
  };

  windowElement.querySelector(".tb-min").onclick = (event) => {
    event.stopPropagation();
    windowElement.style.display = "none";
  };

  windowElement.querySelector(".tb-max").onclick = (event) => {
    event.stopPropagation();
    toggleMaximize(windowElement);
  };

  windowElement.addEventListener("pointerdown", () => {
    focusWindow(id);
  });
}

function toggleMaximize(windowElement) {
  const isMaximized =
    windowElement.dataset.maximized === "true";

  if (isMaximized) {
    ["left", "top", "width", "height"].forEach((property) => {
      const previousProperty =
        `previous${property[0].toUpperCase()}${property.slice(1)}`;

      windowElement.style[property] =
        windowElement.dataset[previousProperty];
    });

    windowElement.dataset.maximized = "false";
    return;
  }

  ["left", "top", "width", "height"].forEach((property) => {
    const previousProperty =
      `previous${property[0].toUpperCase()}${property.slice(1)}`;

    windowElement.dataset[previousProperty] =
      windowElement.style[property];
  });

  Object.assign(windowElement.style, {
    left: "8px",
    top: "36px",
    width: "calc(100vw - 16px)",
    height: "calc(100vh - 100px)",
  });

  windowElement.dataset.maximized = "true";
}

function focusWindow(id) {
  const windowElement = openWindows.get(id);

  if (windowElement) {
    windowElement.style.zIndex = ++highestZIndex;
  }
}

function makeWindowDraggable(windowElement) {
  const titlebar = windowElement.querySelector(".titlebar");

  titlebar.addEventListener("pointerdown", (event) => {
    if (
      event.target.classList.contains("tb-btn") ||
      windowElement.dataset.maximized === "true"
    ) {
      return;
    }

    event.preventDefault();

    const startX = event.clientX;
    const startY = event.clientY;
    const originalX = parseInt(windowElement.style.left, 10);
    const originalY = parseInt(windowElement.style.top, 10);
    const windowWidth = windowElement.offsetWidth;

    const move = (moveEvent) => {
      windowElement.style.left = `${clamp(
        originalX + moveEvent.clientX - startX,
        -windowWidth + 120,
        window.innerWidth - 120,
      )}px`;

      windowElement.style.top = `${clamp(
        originalY + moveEvent.clientY - startY,
        30,
        window.innerHeight - 70,
      )}px`;
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  });
}


function buildWidgets() {
  const randomThought =
    WIDGETS.thoughts[
      Math.floor(Math.random() * WIDGETS.thoughts.length)
    ];

  const stickyItems = WIDGETS.stickyNote.items
    .map(
      (item) => `
        <li class="${item.completed ? "completed" : ""}">
          <span aria-hidden="true">
            ${item.completed ? "✓" : "○"}
          </span>

          <span>${escapeHtml(item.text)}</span>
        </li>
      `,
    )
    .join("");

  const widgetLayer = document.createElement("div");
  widgetLayer.id = "widget-layer";

  widgetLayer.innerHTML = `
    <section
      class="desktop-widget profile-widget"
      data-widget="profile"
    >
      <img
        src="${escapeHtml(WIDGETS.profile.image)}"
        alt="Portrait of Adéla"
      >

      <div>
        <h2>${escapeHtml(WIDGETS.profile.title)}</h2>

        <p>${escapeHtml(WIDGETS.profile.text)}</p>
      </div>
    </section>

    <section
      class="desktop-widget thought-widget"
      data-widget="thought"
    >
      <span class="widget-label">
        Random thought
      </span>

      <p>“${escapeHtml(randomThought)}”</p>
    </section>

    <section
      class="desktop-widget sticky-widget"
      data-widget="sticky"
    >
      <h2>${escapeHtml(WIDGETS.stickyNote.title)}</h2>

      <ul>
        ${stickyItems}
      </ul>
    </section>

    <section
      class="desktop-widget player-widget"
      data-widget="player"
    >
      <img
        class="player-cover"
        src=""
        alt=""
      >

      <div class="player-info">
        <span class="widget-label">
          ${escapeHtml(WIDGETS.nowPlaying.title)}
        </span>

        <strong class="player-song-title"></strong>
        <small class="player-artist"></small>

        <div class="player-controls">
          <button
            type="button"
            class="player-previous"
            aria-label="Previous song"
          >
            ◀
          </button>

          <button
            type="button"
            class="player-play"
            aria-label="Play or pause"
          >
            ▶
          </button>

          <button
            type="button"
            class="player-next"
            aria-label="Next song"
          >
            ▶
          </button>
        </div>

        <div class="player-timeline">
          <span class="player-current-time">0:00</span>

          <div class="player-progress">
            <span class="player-progress-fill"></span>
          </div>

          <span class="player-duration">0:00</span>
        </div>
      </div>
    </section>
  `;

  document.body.appendChild(widgetLayer);

  positionWidgets(widgetLayer);

  widgetLayer
    .querySelectorAll(".desktop-widget")
    .forEach(makeWidgetDraggable);

  initializeMusicPlayer(widgetLayer);
}

function positionWidgets(widgetLayer = document) {
  const widgetPositions = {
    profile: { x: 485, y: 295 },
    thought: { x: 385, y: 210 },
    sticky: { x: 1300, y: 20 },
    player: { x: 1040, y: 825 },
  };

  widgetLayer
    .querySelectorAll(".desktop-widget")
    .forEach((widget) => {
      const position = widgetPositions[widget.dataset.widget];

      if (!position) {
        return;
      }

      const scaled = scaleDesktopPosition(
        position.x,
        position.y,
      );

      widget.style.left = `${clamp(
        scaled.x,
        0,
        window.innerWidth - widget.offsetWidth,
      )}px`;

      widget.style.top = `${clamp(
        scaled.y,
        32,
        window.innerHeight - widget.offsetHeight - 88,
      )}px`;

      widget.style.right = "auto";
      widget.style.bottom = "auto";
    });
}


function initializeMusicPlayer(widgetLayer) {
  const songs = WIDGETS.nowPlaying.songs;

  if (!songs?.length) {
    return;
  }

  const player = widgetLayer.querySelector(".player-widget");
  const cover = player.querySelector(".player-cover");
  const title = player.querySelector(".player-song-title");
  const artist = player.querySelector(".player-artist");
  const currentTimeElement =
    player.querySelector(".player-current-time");
  const durationElement =
    player.querySelector(".player-duration");
  const progressFill =
    player.querySelector(".player-progress-fill");

  const previousButton =
    player.querySelector(".player-previous");
  const playButton =
    player.querySelector(".player-play");
  const nextButton =
    player.querySelector(".player-next");

  let currentSongIndex = 0;
  let elapsedSeconds = 0;
  let isPlaying = false;
  let timer = null;

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  function renderSong() {
    const song = songs[currentSongIndex];

    cover.src = song.cover;
    cover.alt = `${song.title} album cover`;

    title.textContent = song.title;
    artist.textContent = song.artist;

    currentTimeElement.textContent =
      formatTime(elapsedSeconds);

    durationElement.textContent =
      formatTime(song.duration);

    const progress =
      song.duration > 0
        ? (elapsedSeconds / song.duration) * 100
        : 0;

    progressFill.style.width = `${progress}%`;
  }

  function stopTimer() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function pausePlayer() {
    isPlaying = false;
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play");
    stopTimer();
  }

  function playPlayer() {
    if (isPlaying) {
      return;
    }

    isPlaying = true;
    playButton.textContent = "❚❚";
    playButton.setAttribute("aria-label", "Pause");

    stopTimer();

    timer = window.setInterval(() => {
      const song = songs[currentSongIndex];

      elapsedSeconds += 1;

      if (elapsedSeconds >= song.duration) {
        changeSong(1);
        return;
      }

      renderSong();
    }, 1000);
  }

  function changeSong(direction) {
    currentSongIndex =
      (currentSongIndex + direction + songs.length) %
      songs.length;

    elapsedSeconds = 0;
    renderSong();

    if (isPlaying) {
      stopTimer();
      isPlaying = false;
      playPlayer();
    }
  }

  playButton.addEventListener("click", () => {
    if (isPlaying) {
      pausePlayer();
    } else {
      playPlayer();
    }
  });

  previousButton.addEventListener("click", () => {
    changeSong(-1);
  });

  nextButton.addEventListener("click", () => {
    changeSong(1);
  });

  renderSong();
}

function makeWidgetDraggable(widget) {
  widget.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button, a")) {
      return;
    }

    event.preventDefault();

    const startX = event.clientX;
    const startY = event.clientY;

    const originalLeft = widget.offsetLeft;
    const originalTop = widget.offsetTop;

    const move = (moveEvent) => {
      const nextLeft =
        originalLeft + moveEvent.clientX - startX;

      const nextTop =
        originalTop + moveEvent.clientY - startY;

      widget.style.left = `${clamp(
        nextLeft,
        0,
        window.innerWidth - widget.offsetWidth,
      )}px`;

      widget.style.top = `${clamp(
        nextTop,
        32,
        window.innerHeight - widget.offsetHeight - 90,
      )}px`;
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  });
}


function buildReadme() {
  const sections = DESKTOP_README.sections
    .map(
      (section) => `
        <section class="readme-section">
          <h2>${escapeHtml(section.title)}</h2>

          <ul>
            ${section.items
              .map(
                (item) =>
                  `<li>${escapeHtml(item)}</li>`,
              )
              .join("")}
          </ul>
        </section>
      `,
    )
    .join("");

  return `
    <article class="readme-document">
      <h1>
        <span class="readme-hash">#</span>
        ${escapeHtml(DESKTOP_README.title)}
      </h1>

      <p>${escapeHtml(DESKTOP_README.introduction)}</p>

      ${sections}
    </article>
  `;
}

function buildCvEntries(entries) {
  return entries
    .map((entry) => {
      const items = entry.items.length
        ? `
          <ul>
            ${entry.items
              .map(
                (item) =>
                  `<li>${escapeHtml(item)}</li>`,
              )
              .join("")}
          </ul>
        `
        : "";

      return `
        <article class="cv-entry">
          <div class="cv-entry-heading">
            <div>
              <h3>${escapeHtml(entry.heading)}</h3>

              <p class="cv-organization">
                ${escapeHtml(entry.organization)}
              </p>
            </div>

            <span class="cv-date">
              ${escapeHtml(entry.date)}
            </span>
          </div>

          ${items}
        </article>
      `;
    })
    .join("");
}

function buildCvSection(section) {
  let content;

  if (section.entries) {
    content = buildCvEntries(section.entries);
  } else if (section.groups) {
    content = section.groups
      .map(
        (group) => `
          <p>
            <strong>${escapeHtml(group.label)}:</strong>
            ${escapeHtml(group.value)}
          </p>
        `,
      )
      .join("");
  } else {
    content = `
      <ul>
        ${section.items
          .map(
            (item) =>
              `<li>${escapeHtml(item)}</li>`,
          )
          .join("")}
      </ul>
    `;
  }

  return `
    <section class="cv-section">
      <h2>${escapeHtml(section.title)}</h2>
      ${content}
    </section>
  `;
}

function buildCv() {
  const phoneLink = ME.phone.replace(/\s/g, "");

  return `
    <article>
      <header class="cv-head">
        <h1>${escapeHtml(ME.name)}</h1>

        <p class="cv-title">
          ${escapeHtml(CV.headline)}
        </p>

        <p class="cv-contact">
          ${escapeHtml(ME.location)}
          ·
          <a href="tel:${phoneLink}">
            ${escapeHtml(ME.phone)}
          </a>
          ·
          <a href="mailto:${escapeHtml(ME.email)}">
            ${escapeHtml(ME.email)}
          </a>
        </p>

        <p class="cv-contact">
          <a
            href="${ME.linkedin}"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          ·

          <a
            href="${ME.github}"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </header>

      <section class="cv-section">
        <h2>Summary</h2>
        <p>${escapeHtml(CV.summary)}</p>
      </section>

      ${CV.sections.map(buildCvSection).join("")}
    </article>
  `;
}

function projectHtml(project) {
  const technologies = project.technologies
    .map(
      (technology) => `
        <span class="tag">
          ${escapeHtml(technology)}
        </span>
      `,
    )
    .join("");

  let gallery = "";

  if (project.gallery && project.gallery.length > 0) {
    const galleryItems = project.gallery
      .map((item) => {
        if (item.type === "countdown") {
          const countdownImages = item.images
            .map(
              (src, index) => `
                <a
                  class="countdown-image-link"
                  href="${escapeHtml(src)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open countdown image ${index + 1}"
                >
                  <img
                    src="${escapeHtml(src)}"
                    alt="Photobooth countdown step ${index + 1}"
                    loading="lazy"
                  >
                </a>
              `,
            )
            .join("");

          return `
            <figure class="project-gallery-item countdown-card">
              <div class="countdown-grid">
                ${countdownImages}
              </div>

              <figcaption>
                ${escapeHtml(item.caption)}
              </figcaption>
            </figure>
          `;
        }

        if (item.type === "mosaic") {
          const mosaicImages = item.images
            .map(
              (image, index) => `
                <a
                  class="mosaic-image-link mosaic-item mosaic-item-${index + 1}"
                  href="${escapeHtml(image.src)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open ${escapeHtml(image.caption)}"
                >
                  <img
                    src="${escapeHtml(image.src)}"
                    alt="${escapeHtml(image.caption)}"
                    loading="lazy"
                  >
                </a>
              `,
            )
            .join("");

          return `
            <figure class="project-gallery-item mosaic-card">
              <div class="mosaic-grid">
                ${mosaicImages}
              </div>

              <figcaption>
                ${escapeHtml(item.caption)}
              </figcaption>
            </figure>
          `;
        }

        if (item.type === "wide-grid") {
          const wideImages = item.images
            .map(
              (image) => `
                <figure class="wide-grid-item">
                  <a
                    class="wide-grid-link"
                    href="${escapeHtml(image.src)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open ${escapeHtml(image.caption)}"
                  >
                    <img
                      src="${escapeHtml(image.src)}"
                      alt="${escapeHtml(image.caption)}"
                      loading="lazy"
                    >
                  </a>

                  <figcaption>
                    ${escapeHtml(image.caption)}
                  </figcaption>
                </figure>
              `,
            )
            .join("");

          return `
            <figure class="project-gallery-item wide-grid-card">
              <div class="wide-grid">
                ${wideImages}
              </div>

              <figcaption>
                ${escapeHtml(item.caption)}
              </figcaption>
            </figure>
          `;
        }

        return `
          <figure class="project-gallery-item">
            <a
              class="project-image-link"
              href="${escapeHtml(item.src)}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open ${escapeHtml(item.caption)}"
            >
              <img
                class="${escapeHtml(item.className || "")}"
                src="${escapeHtml(item.src)}"
                alt="${escapeHtml(item.caption)}"
                loading="lazy"
              >
            </a>

            <figcaption>
              ${escapeHtml(item.caption)}
            </figcaption>
          </figure>
        `;
      })
      .join("");

    gallery = `
      <section class="project-gallery-section">
        <h2>Screenshots</h2>

        <div class="project-gallery">
          ${galleryItems}
        </div>
      </section>
    `;
  }

  return `
    <h1>${escapeHtml(project.name)}</h1>

    ${
      project.status
        ? `
          <span class="project-status">
            ${escapeHtml(project.status)}
          </span>
        `
        : ""
    }

    <div class="tag-list">
      ${technologies}
    </div>

    <p>${escapeHtml(project.description)}</p>

    ${gallery}

    <a
      class="btn"
      href="${escapeHtml(project.link)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open on GitHub →
    </a>
  `;
}


function buildNotes() {
  const noteLinks = NOTES.map(
    (note) => `
      <button
        class="note-link${note.locked ? " locked-note" : ""}"
        data-note="${escapeHtml(note.id)}"
        type="button"
      >
        <span>${escapeHtml(note.label)}</span>

        ${
          note.locked
            ? `
              <span
                class="note-lock"
                aria-hidden="true"
              >
                🔒
              </span>
            `
            : ""
        }
      </button>
    `,
  ).join("");

  return `
    <div class="notes-app">
      <aside class="notes-sidebar">
        <div class="notes-list">
          ${noteLinks}
        </div>
      </aside>

      <article class="notes-detail"></article>
    </div>
  `;
}

function noteContent(id) {
  const note = NOTES.find(
    (item) => item.id === id,
  );

  if (!note) {
    return "";
  }

  const { content } = note;

  if (id === "about") {
    const paragraphs = content.paragraphs
      .map(
        (paragraph) => `
          <p>${escapeHtml(paragraph)}</p>
        `,
      )
      .join("");

    const skills = content.skills
      .map(
        (skill) => `
          <li class="simple-check-item">
            <span class="simple-check-icon" aria-hidden="true">
              ✓
            </span>

            <div>
              <strong>${escapeHtml(skill.title)}</strong>

              <p>
                ${escapeHtml(skill.description)}
              </p>
            </div>
          </li>
        `,
      )
      .join("");

    const funFacts = content.funFacts
      .map(
        (fact) => `
          <li>
            <span aria-hidden="true">
              ${escapeHtml(fact.icon)}
            </span>

            <span>
              ${escapeHtml(fact.text)}
            </span>
          </li>
        `,
      )
      .join("");

    return `
      <section class="note-document">
        <p class="note-eyebrow">
          ${escapeHtml(content.eyebrow)}
        </p>

        <h1>${escapeHtml(content.title)}</h1>

        ${paragraphs}

        <section class="note-section">
          <h2>
            ${escapeHtml(content.skillsTitle)}
          </h2>

          <ul class="simple-check-list">
            ${skills}
          </ul>
        </section>

        <section class="note-section">
          <h2>
            ${escapeHtml(content.funFactsTitle)}
          </h2>

          <ul class="simple-facts-list">
            ${funFacts}
          </ul>
        </section>
      </section>
    `;
  }

  if (id === "cv") {
    const paragraphs = content.paragraphs
      .map(
        (paragraph) => `
          <p>${escapeHtml(paragraph)}</p>
        `,
      )
      .join("");

    return `
      <section class="note-document funny-cv">
        <p class="note-eyebrow">
          ${escapeHtml(content.eyebrow)}
        </p>

        <h1>${escapeHtml(content.title)}</h1>

        <section class="cv-note-intro">
          <h2>
            ${escapeHtml(content.introduction.title)}
          </h2>

          <p>
            ${escapeHtml(content.introduction.text)}
          </p>
        </section>

        <div class="funny-cv-text">
          ${paragraphs}
        </div>

        <button
          class="btn note-open-window"
          type="button"
          data-window="${escapeHtml(content.button.action)}"
        >
          ${escapeHtml(content.button.label)}
        </button>
      </section>
    `;
  }

  if (id === "interests") {
    const groups = content.groups
      .map(
        (group) => `
          <section class="simple-interest-group">
            <h2>${escapeHtml(group.title)}</h2>

            <ul class="simple-interest-list">
              ${group.items
                .map(
                  (item) => `
                    <li>${escapeHtml(item)}</li>
                  `,
                )
                .join("")}
            </ul>
          </section>
        `,
      )
      .join("");

    return `
      <section class="note-document">
        <p class="note-eyebrow">
          ${escapeHtml(content.eyebrow)}
        </p>

        <h1>${escapeHtml(content.title)}</h1>

        <p>
          ${escapeHtml(content.introduction)}
        </p>

        <div class="simple-interest-groups">
          ${groups}
        </div>
      </section>
    `;
  }

  if (id === "bucket-list") {
    const items = content.items
      .map(
        (item) => `
          <label class="bucket-item${
            item.completed ? " completed" : ""
          }">
            <input
              type="checkbox"
              ${item.completed ? "checked" : ""}
              disabled
            >

            <span>${escapeHtml(item.text)}</span>
          </label>
        `,
      )
      .join("");

    return `
      <section class="note-document">
        <p class="note-eyebrow">
          ${escapeHtml(content.eyebrow)}
        </p>

        <h1>${escapeHtml(content.title)}</h1>

        <p class="bucket-intro">
          ${escapeHtml(content.introduction)}
        </p>

        <div class="bucket-list">
          ${items}
        </div>
      </section>
    `;
  }

  if (id === "contact") {
    const items = content.items
      .map((item) => {
        const body = `
          <span class="contact-icon">
            ${escapeHtml(item.icon)}
          </span>

          <span>
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.value)}</small>
          </span>
        `;

        if (!item.href) {
          return `
            <div class="contact-card">
              ${body}
            </div>
          `;
        }

        return `
          <a
            class="contact-card"
            href="${escapeHtml(item.href)}"
            ${
              item.external
                ? 'target="_blank" rel="noopener noreferrer"'
                : ""
            }
          >
            ${body}
          </a>
        `;
      })
      .join("");

    return `
      <section class="note-document">
        <p class="note-eyebrow">
          ${escapeHtml(content.eyebrow)}
        </p>

        <h1>${escapeHtml(content.title)}</h1>

        <p>
          ${escapeHtml(content.introduction)}
        </p>

        <div class="contact-list">
          ${items}
        </div>
      </section>
    `;
  }

  if (id === "bank-info") {
    return `
      <section class="locked-content">
        <div
          class="large-lock"
          aria-hidden="true"
        >
          ${escapeHtml(content.icon)}
        </div>

        <p class="note-eyebrow">
          ${escapeHtml(content.eyebrow)}
        </p>

        <h1>${escapeHtml(content.title)}</h1>

        <p>${escapeHtml(content.text)}</p>

        <p class="lock-message">
          ${escapeHtml(content.message)}
        </p>

        <div
          class="large-lock bottom-lock"
          aria-hidden="true"
        >
          ${escapeHtml(content.icon)}
        </div>
      </section>
    `;
  }

  return "";
}

function initializeNotes(windowElement) {
  const detail = windowElement.querySelector(".notes-detail");
  const links = windowElement.querySelectorAll(".note-link");

  links.forEach((button) => {
    button.addEventListener("click", () => {
      links.forEach((link) => {
        link.classList.remove("active");
      });

      button.classList.add("active");

      detail.innerHTML = noteContent(
        button.dataset.note,
      );
    });
  });

  detail.addEventListener("click", (event) => {
    const button = event.target.closest(".note-open-window");

    if (!button) {
      return;
    }

    openWindow(button.dataset.window);
  });

  links[0]?.click();
}

function buildGallery() {
  if (!GALLERY.length) {
    return `
      <div class="empty">
        <div class="em">🖼️</div>

        <p>
          <strong>Gallery is empty</strong>
        </p>
      </div>
    `;
  }

  const items = GALLERY.map(
    (galleryItem) => `
      <figure>
        <img
          src="${escapeHtml(galleryItem.src)}"
          alt="${escapeHtml(galleryItem.caption)}"
        >

        <figcaption>
          ${escapeHtml(galleryItem.caption)}
        </figcaption>
      </figure>
    `,
  ).join("");

  return `
    <div class="gallery-grid">
      ${items}
    </div>
  `;
}

function buildWindow(id) {
  const base = {
    width: 680,
    height: 520,
  };

  if (id === "about") {
    return {
      ...base,
      title: "About Me.txt",
      html: `
        <h1>
          Hi, I'm ${escapeHtml(ME.name)} 👋
        </h1>

        ${ABOUT_ME.split("\n\n")
          .map(
            (paragraph) =>
              `<p>${escapeHtml(paragraph)}</p>`,
          )
          .join("")}
      `,
    };
  }

  if (id === "cv") {
    return {
      width: 820,
      height: 900,
      title: "Adela_Polkova_CV.pdf",
      html: buildCv(),
    };
  }

  if (id === "readme") {
    return {
      width: 720,
      height: 560,
      title: "README.md",
      html: buildReadme(),
    };
  }

  if (id === "notes") {
    return {
      width: 900,
      height: 610,
      title: "Notes",
      html: buildNotes(),
    };
  }

  if (id === "swot") {
    return {
      width: 720,
      height: 650,
      title: "SWOT.png",

      html: `
        <div class="swot-document">
          <img
            class="swot-image"
            src="./assets/documents/SWOT.png"
            alt="Handwritten personal SWOT analysis"
          >
        </div>
      `,
    };
  }

  if (id === "gallery") {
    return {
      width: 720,
      height: 520,
      title: "Gallery",
      html: buildGallery(),
    };
  }

  if (id === "mail") {
    return {
      width: 550,
      height: 350,
      title: "New Message",
      html: `
        <h1>Contact me</h1>

        <p>
          Send a message to
          <strong>${ME.email}</strong>.
        </p>

        <a
          class="btn"
          href="mailto:${ME.email}?subject=${encodeURIComponent(
            "Hello Adéla!",
          )}"
        >
          ✉ Open mail app
        </a>
      `,
    };
  }

  if (id === "shortcuts") {
    return {
      width: 480,
      height: 350,
      title: "Keyboard Shortcuts",
      html: `
        <h1>Keyboard Shortcuts</h1>

        <ul>
          <li>
            <strong>Enter / Space:</strong>
            open a focused desktop icon.
          </li>

          <li>
            <strong>Escape:</strong>
            close an open menu.
          </li>

          <li>
            <strong>F11:</strong>
            browser full screen, depending on the browser.
          </li>
        </ul>
      `,
    };
  }

  if (id === "portfolio-about") {
    return {
      width: 520,
      height: 360,
      title: "About This Portfolio",
      html: `
        <h1>About This Portfolio</h1>

        <p>
          Built with semantic HTML, CSS, SVG, and
          modular JavaScript—without a framework.
        </p>

        <p>
          Created by ${escapeHtml(ME.name)}.
        </p>
      `,
    };
  }

  if (id.startsWith("project-")) {
    const projectIndex = Number(id.split("-")[1]);
    const project = PROJECTS[projectIndex];

    if (!project) {
      return null;
    }

    return {
      width: 660,
      height: 540,
      title: project.name,
      html: projectHtml(project),
    };
  }

  return null;
}

const menuDefs = {
  file: [
    {
      label: "Open About Me",
      action: () => openWindow("about"),
    },
    {
      label: "Open CV",
      action: () => openWindow("cv"),
    },
    {
      label: "Open README",
      action: () => openWindow("readme"),
    },
    {
      label: "Open Notes",
      action: () => openWindow("notes"),
    },
    {
      label: "Open Gallery",
      action: () => openWindow("gallery"),
    },
    {
      sep: true,
    },
    {
      label: "Open GitHub",
      action: () => openExternal(ME.github),
    },
    {
      label: "Open LinkedIn",
      action: () => openExternal(ME.linkedin),
    },
    {
      label: "Send Email",
      action: () => openWindow("mail"),
    },
    {
      label: "Open SWOT",
      action: () => openWindow("swot"),
    },
  ],

  edit: [
    {
      label: "Copy Email Address",
      action: () =>
        copyText(ME.email, "Email copied"),
    },
    {
      label: "Copy GitHub Link",
      action: () =>
        copyText(ME.github, "GitHub link copied"),
    },
    {
      label: "Copy LinkedIn Link",
      action: () =>
        copyText(
          ME.linkedin,
          "LinkedIn link copied",
        ),
    },
    {
      sep: true,
    },
    {
      label: "Reset Desktop Layout",
      action: resetLayout,
    },
  ],

  view: [
    {
      label: "Important Files",
      check: () => viewState.important,
      action: () => toggleView("important"),
    },
    {
      label: "Projects",
      check: () => viewState.projects,
      action: () => toggleView("projects"),
    },
    {
      sep: true,
    },
    {
      label: "Dock",
      check: () => viewState.dock,
      action: () => toggleView("dock"),
    },
    {
      label: "Enter Full Screen",
      action: toggleFullscreen,
    },
  ],

  help: [
    {
      label: "How Does This Work?",
      action: () => openWindow("readme"),
    },
    {
      label: "Keyboard Shortcuts",
      action: () => openWindow("shortcuts"),
    },
    {
      sep: true,
    },
    {
      label: "About This Portfolio",
      action: () => openWindow("portfolio-about"),
    },
  ],
};

function windowMenu() {
  const entries = [
    {
      label: "Minimize All",
      action: () => {
        openWindows.forEach((windowElement) => {
          windowElement.style.display = "none";
        });
      },
    },
    {
      label: "Restore All",
      action: () => {
        openWindows.forEach((windowElement) => {
          windowElement.style.display = "flex";
        });
      },
    },
    {
      label: "Close All",
      action: () => {
        openWindows.forEach((windowElement) => {
          windowElement.remove();
        });

        openWindows.clear();
      },
    },
    {
      sep: true,
    },
  ];

  if (!openWindows.size) {
    entries.push({
      label: "No open windows",
      disabled: true,
    });

    return entries;
  }

  openWindows.forEach((windowElement, id) => {
    entries.push({
      label:
        windowElement.querySelector(".tb-title").textContent,

      check: () =>
        windowElement.style.display !== "none",

      action: () => {
        windowElement.style.display = "flex";
        focusWindow(id);
      },
    });
  });

  return entries;
}

function showMenu(name, trigger) {
  closeMenu();

  let items;

  if (name === "window") {
    items = windowMenu();
  } else if (name === "brand") {
    items = [
      {
        label: "About This Portfolio",
        action: () =>
          openWindow("portfolio-about"),
      },
      {
        label: "Open GitHub",
        action: () =>
          openExternal(ME.github),
      },
    ];
  } else {
    items = menuDefs[name];
  }

  if (!items) {
    return;
  }

  const menu = document.createElement("div");
  menu.className = "dropdown-menu";

  const triggerPosition =
    trigger.getBoundingClientRect();

  menu.style.left = `${triggerPosition.left}px`;
  menu.style.top = `${triggerPosition.bottom + 2}px`;

  items.forEach((item) => {
    if (item.sep) {
      const separator =
        document.createElement("div");

      separator.className = "menu-separator";
      menu.appendChild(separator);
      return;
    }

    const button = document.createElement("button");

    button.className = "menu-item";
    button.disabled = Boolean(item.disabled);

    button.innerHTML = `
      <span class="menu-check">
        ${item.check?.() ? "✓" : ""}
      </span>

      <span class="menu-label">
        ${escapeHtml(item.label)}
      </span>
    `;

    button.onclick = () => {
      item.action?.();
      closeMenu();
    };

    menu.appendChild(button);
  });

  menuLayer.appendChild(menu);
  trigger.classList.add("active");

  activeMenu = {
    name,
    trigger,
    menu,
  };
}

function closeMenu() {
  menuLayer.innerHTML = "";

  document
    .querySelectorAll(
      ".menu-trigger.active, .brand-button.active",
    )
    .forEach((element) => {
      element.classList.remove("active");
    });

  activeMenu = null;
}

document
  .querySelectorAll("[data-menu]")
  .forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();

      if (
        activeMenu?.name === trigger.dataset.menu
      ) {
        closeMenu();
      } else {
        showMenu(
          trigger.dataset.menu,
          trigger,
        );
      }
    });
  });

document.addEventListener("pointerdown", (event) => {
  if (
    activeMenu &&
    !activeMenu.menu.contains(event.target) &&
    !activeMenu.trigger.contains(event.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

function toggleView(key) {
  viewState[key] = !viewState[key];
  applyViewState();
}

function openExternal(url) {
  window.open(
    url,
    "_blank",
    "noopener,noreferrer",
  );
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch {
    showToast(
      "Copy failed — use the CV contact link instead",
    );
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function showToast(message) {
  document.querySelector(".toast")?.remove();

  const toast = document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1800);
}

document
  .querySelectorAll(".dock button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      openWindow(button.dataset.app);
    });
  });

function updateClock() {
  const date = new Date();

  const formattedDate = date.toLocaleDateString(
    undefined,
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    },
  );

  const formattedTime = date.toLocaleTimeString(
    undefined,
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  document.getElementById("clock").textContent =
    `${formattedDate}  ${formattedTime}`;
}


window.addEventListener("resize", () => {
  baseIcons.forEach((baseIcon, index) => {
    Object.assign(
      icons[index],
      importantIconPosition(baseIcon.id),
    );
  });

  PROJECTS.forEach((_, index) => {
    Object.assign(
      icons[baseIcons.length + index],
      projectPosition(index),
    );
  });

  renderDesktopIcons();
  positionWidgets();
});

renderDesktopIcons();
buildWidgets();
updateClock();

setInterval(updateClock, 30000);