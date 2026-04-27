const data = {
  minus: {
    title: "Minus House",
    text: "Usually cheaper to build at first, but often uses more energy and costs more to run over time.",
    facts: [
      "Lower build cost in general",
      "Higher heating demand",
      "Higher energy use over time",
      "Less energy-efficient overall"
    ],
    features: [
      {
        icon: "❄️",
        title: "Poor Insulation",
        text: "More heat escapes through the walls, roof, windows, and floor.",
        pros: ["Lower construction cost"],
        cons: ["More heat loss", "Higher heating bills", "Lower comfort"],
        extra: "A poorly insulated home often needs much more energy during colder months.",
        x: 36,
        y: 92
      },
      {
        icon: "⚡",
        title: "High Energy Use",
        text: "The house often needs more electricity and heating in daily use.",
        pros: ["Simpler setup"],
        cons: ["Higher running costs", "More wasted energy"],
        extra: "Compared with a more efficient house, yearly energy use is often noticeably higher.",
        x: 190,
        y: 136
      },
      {
        icon: "🔥",
        title: "Basic Heating",
        text: "Older or simpler heating systems are often less efficient.",
        pros: ["Cheaper to install"],
        cons: ["Uses more power", "Higher cost later"],
        extra: "Basic heating may be cheaper at the start, but more expensive over time.",
        x: 118,
        y: 228
      }
    ]
  },

  plus: {
    title: "Plus House",
    text: "Usually more expensive to build, but often much cheaper to run and more energy-efficient.",
    facts: [
      "Higher build cost in general",
      "Lower running cost over time",
      "Lower energy use",
      "Can produce its own electricity"
    ],
    features: [
      {
        icon: "☀️",
        title: "Solar Panels",
        text: "Solar panels produce electricity from sunlight and reduce grid power use.",
        pros: ["Lower electricity bills", "Cleaner energy", "Better long-term savings"],
        cons: ["Higher installation cost"],
        extra: "Solar panels can make a big difference to the house’s yearly energy balance.",
        x: 92,
        y: 40,
        effect: "solar"
      },
      {
        icon: "🌡️",
        title: "Heat Pump",
        text: "A heat pump provides more efficient heating than many traditional systems.",
        pros: ["Uses less energy", "Lower heating cost"],
        cons: ["More expensive to buy", "Needs maintenance"],
        extra: "Heating is a major part of home energy use, so better heating matters a lot.",
        x: 192,
        y: 140
      },
      {
        icon: "📱",
        title: "Smart Control",
        text: "Smart systems help manage lighting, temperature, and energy use more efficiently.",
        pros: ["Less waste", "Better control", "Useful automation"],
        cons: ["Setup can be harder"],
        extra: "Smart control works best together with good insulation and efficient heating.",
        x: 28,
        y: 132
      },
      {
        icon: "🧱",
        title: "Better Insulation",
        text: "Good insulation keeps heat inside the home more effectively.",
        pros: ["Lower heat loss", "Lower heating demand", "Better comfort"],
        cons: ["Higher build cost"],
        extra: "Insulation is one of the biggest reasons an efficient house uses less energy.",
        x: 106,
        y: 222
      }
    ]
  }
};

const minusFeatures = document.getElementById("minusFeatures");
const plusFeatures = document.getElementById("plusFeatures");
const minusSide = document.getElementById("minusSide");
const plusSide = document.getElementById("plusSide");
const floatingInfo = document.getElementById("floatingInfo");
const sliderTrack = document.getElementById("sliderTrack");
const sliderHandle = document.getElementById("sliderHandle");
const sunEffect = document.getElementById("sunEffect");
const solarPanel = document.getElementById("solarPanel");

let currentMode = "neutral";
let isDragging = false;

function createFeature(feature, type) {
  const el = document.createElement("div");
  el.className = `feature ${type}`;
  el.style.left = `${feature.x}px`;
  el.style.top = `${feature.y}px`;
  el.textContent = feature.icon;

  el.addEventListener("mouseenter", () => {
    if (feature.effect === "solar") {
      sunEffect.classList.add("active");
      solarPanel.style.transform = "rotate(-27deg) scale(1.08)";
      solarPanel.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.2), 0 0 24px rgba(255,211,77,0.5)";
    }

    floatingInfo.innerHTML = `
      <h3>${feature.title}</h3>
      <p>${feature.text}</p>
      <ul>
        <li><strong>Pros:</strong> ${feature.pros.join(", ")}</li>
        <li><strong>Cons:</strong> ${feature.cons.join(", ")}</li>
      </ul>
      <p>${feature.extra}</p>
    `;
  });

  el.addEventListener("mouseleave", () => {
    if (feature.effect === "solar") {
      sunEffect.classList.remove("active");
      solarPanel.style.transform = "rotate(-27deg)";
      solarPanel.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.2)";
    }

    showMainInfo(currentMode);
  });

  return el;
}

function renderMode(mode) {
  minusFeatures.innerHTML = "";
  plusFeatures.innerHTML = "";

  minusSide.classList.remove("active");
  plusSide.classList.remove("active");
  sunEffect.classList.remove("active");

  solarPanel.style.transform = "rotate(-27deg)";
  solarPanel.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.2)";

  if (mode === "minus") {
    minusSide.classList.add("active");
    data.minus.features.forEach((feature) => {
      minusFeatures.appendChild(createFeature(feature, "minus"));
    });
  } else if (mode === "plus") {
    plusSide.classList.add("active");
    data.plus.features.forEach((feature) => {
      plusFeatures.appendChild(createFeature(feature, "plus"));
    });
  }

  showMainInfo(mode);
}

function showMainInfo(mode) {
  if (mode === "minus") {
    floatingInfo.innerHTML = `
      <h3>${data.minus.title}</h3>
      <p>${data.minus.text}</p>
      <ul>
        ${data.minus.facts.map((fact) => `<li>${fact}</li>`).join("")}
      </ul>
    `;
  } else if (mode === "plus") {
    floatingInfo.innerHTML = `
      <h3>${data.plus.title}</h3>
      <p>${data.plus.text}</p>
      <ul>
        ${data.plus.facts.map((fact) => `<li>${fact}</li>`).join("")}
      </ul>
    `;
  } else {
    floatingInfo.innerHTML = `
      <h3>Select a house</h3>
      <p>Drag the handle left or right to explore each house.</p>
    `;
  }
}

function updateSlider(clientX) {
  const rect = sliderTrack.getBoundingClientRect();
  const handleWidth = sliderHandle.offsetWidth;
  let x = clientX - rect.left - handleWidth / 2;
  const max = rect.width - handleWidth;

  x = Math.max(0, Math.min(x, max));
  sliderHandle.style.left = `${x}px`;

  const center = x + handleWidth / 2;
  const leftZone = rect.width * 0.4;
  const rightZone = rect.width * 0.6;

  let newMode = "neutral";

  if (center <= leftZone) {
    newMode = "minus";
  } else if (center >= rightZone) {
    newMode = "plus";
  }

  if (newMode !== currentMode) {
    currentMode = newMode;
    renderMode(currentMode);
  }
}

sliderHandle.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (event) => {
  if (!isDragging) return;
  updateSlider(event.clientX);
});

sliderTrack.addEventListener("click", (event) => {
  updateSlider(event.clientX);
});

renderMode("neutral");