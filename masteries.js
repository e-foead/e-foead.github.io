const masterylist = [
  {
    lookup: "arcanamancy",
    name: "Arcanamancy",
    color: "#50cbe3",
    image: "https://terrarp.com/db/mastery/w-arcanamancy.png",
    save: "will",
    expertise: "knowledge",
    actions: ["Normal Attack", "Recover", "Guard", "Protect", "Hinder", "Ultra Protect", "Ultra Hinder"]
  },
  {
    lookup: "astramancy",
    name: "Astramancy",
    color: "#ae43c3",
    image: "https://terrarp.com/db/mastery/w-astramancy.png",
    save: "will",
    expertise: "presence",
    actions: ["Normal Attack", "Recover", "Guard", "Protect", "Hinder", "Ultra Protect", "Ultra Hinder"]
  },
  {
    lookup: "beast-arts",
    name: "Beast Arts",
    color: "#db7233",
    image: "https://terrarp.com/db/mastery/w-beast.png",
    save: "reflex",
    expertise: "knack",
    actions: ["Normal Attack", "Recover", "Guard", "Protect", "Hinder", "Ultra Protect", "Ultra Hinder"]
  },
  {
    lookup: "geomancy",
    name: "Geomancy",
    color: "#a76a36",
    image: "https://terrarp.com/db/mastery/w-geomancy.png",
    save: "fortitude",
    expertise: "fitness",
    actions: ["Normal Attack", "Recover", "Guard", "Protect", "Hinder", "Ultra Protect", "Ultra Hinder"]
  },
  {
    lookup: "guard-arts",
    name: "Guard Arts",
    color: "#f2bb36",
    image: "https://terrarp.com/db/mastery/w-guard.png",
    save: "fortitude",
    expertise: "awareness",
    actions: ["Normal Attack", "Recover", "Guard", "Protect", "Hinder", "Ultra Protect", "Ultra Hinder"]
  },
  {
    lookup: "hemomancy",
    name: "Hemomancy",
    color: "#c32222",
    image: "https://terrarp.com/db/mastery/w-hemomancy.png",
    save: "fortitude",
    expertise: "fitness",
    actions: ["Normal Attack", "Recover", "Guard", "Protect", "Hinder", "Ultra Protect", "Ultra Hinder"]
  },
  {
    lookup: "hydromancy",
    name: "Hydromancy",
    color: "#66b8ea",
    image: "https://terrarp.com/db/mastery/w-hydromancy.png",
    save: "will",
    expertise: "knack",
    actions: ["Normal Attack", "Recover", "Guard", "Protect", "Hinder", "Ultra Protect", "Ultra Hinder"]
  },
  {
    lookup: "illusion-magic",
    name: "Illusion Magic",
    color: "#ea5694",
    image: "https://terrarp.com/db/mastery/w-illusion.png",
    save: "will",
    expertise: "presence",
    actions: ["Normal Attack", "Recover", "Guard", "Protect", "Hinder", "Ultra Protect", "Ultra Hinder"]
  },
  {
    lookup: "aeromancy",
    name: "Aeromancy",
    color: "#48d1c3",
    image: "https://terrarp.com/db/mastery/w-aeromancy.png",
    save: "reflex",
    expertise: "knack",
    actions: ["Normal Attack", "Recover", "Steady", "Hinder", "Ultra Hinder", "Critical Attack", "Burst Attack"]
  },
  {
    lookup: "crush-weapons",
    name: "Crush Weapons",
    color: "#ce5e32",
    image: "https://terrarp.com/db/mastery/w-crush.png",
    save: "fortitude",
    expertise: "fitness",
    actions: ["Normal Attack", "Recover", "Steady", "Hinder", "Ultra Hinder", "Reckless Attack", "Burst Attack"]
  },
  {
    lookup: "dark-magic",
    name: "Dark Magic",
    color: "#883cca",
    image: "https://terrarp.com/db/mastery/w-dark.png",
    save: "will",
    expertise: "knowledge",
    actions: ["Normal Attack", "Recover", "Steady", "Hinder", "Ultra Hinder", "Critical Attack", "Burst Attack"]
  },
  {
    lookup: "martial-arts",
    name: "Martial Arts",
    color: "#c9c9c9",
    image: "https://terrarp.com/db/mastery/w-martial.png",
    save: "fortitude",
    expertise: "fitness",
    actions: ["Normal Attack", "Recover", "Steady", "Hinder", "Ultra Hinder", "Critical Attack", "Reckless Attack"]
  },
  {
    lookup: "pierce-weapons",
    name: "Pierce Weapons",
    color: "#46bcc8",
    image: "https://terrarp.com/db/mastery/w-pierce.png",
    save: "reflex",
    expertise: "knack",
    actions: ["Normal Attack", "Recover", "Steady", "Hinder", "Ultra Hinder", "Critical Attack", "Reckless Attack"]
  },
  {
    lookup: "pyromancy",
    name: "Pyromancy",
    color: "#cb3739",
    image: "https://terrarp.com/db/mastery/w-pyromancy.png",
    save: "will",
    expertise: "presence",
    actions: ["Normal Attack", "Recover", "Steady", "Hinder", "Ultra Hinder", "Burst Attack", "Reckless Attack"]
  },
  {
    lookup: "ranged-weapons",
    name: "Ranged Weapons",
    color: "#77b933",
    image: "https://terrarp.com/db/mastery/w-ranged.png",
    save: "reflex",
    expertise: "awareness",
    actions: ["Normal Attack", "Recover", "Steady", "Hinder", "Ultra Hinder", "Critical Attack", "Reckless Attack"]
  },
  {
    lookup: "shadow-arts",
    name: "Shadow Arts",
    color: "#383838",
    image: "https://terrarp.com/db/mastery/w-shadow.png",
    save: "reflex",
    expertise: "knack",
    actions: ["Normal Attack", "Recover", "Steady", "Hinder", "Ultra Hinder", "Critical Attack", "Reckless Attack"]
  },
  {
    lookup: "slash-weapons",
    name: "Slash Weapons",
    color: "#4263cb",
    image: "https://terrarp.com/db/mastery/w-slash.png",
    save: "fortitude",
    expertise: "fitness",
    actions: ["Normal Attack", "Recover", "Steady", "Hinder", "Ultra Hinder", "Burst Attack", "Reckless Attack"]
  },
  {
    lookup: "alchemy",
    name: "Alchemy",
    color: "#53b159",
    image: "https://terrarp.com/db/mastery/w-alchemy.png",
    save: "fortitude",
    expertise: "knowledge",
    actions: ["Normal Attack", "Recover", "Revive", "Heal", "Buff", "Cleanse", "Power Heal", "Power Buff"]
  },
  {
    lookup: "animancy",
    name: "Animancy",
    color: "#6c319d",
    image: "https://terrarp.com/db/mastery/w-animancy.png",
    save: "will",
    expertise: "knowledge",
    actions: ["Normal Attack", "Recover", "Revive", "Heal", "Buff", "Cleanse", "Power Heal", "Power Buff"]
  },
  {
    lookup: "chronomancy",
    name: "Chronomancy",
    color: "#ec4a97",
    image: "https://terrarp.com/db/mastery/w-chronomancy.png",
    save: "reflex",
    expertise: "awareness",
    actions: ["Normal Attack", "Recover", "Revive", "Heal", "Buff", "Cleanse", "Power Heal", "Power Buff"]
  },
  {
    lookup: "divine-magic",
    name: "Divine Magic",
    color: "#edb82a",
    image: "https://terrarp.com/db/mastery/w-divine.png",
    save: "will",
    expertise: "presence",
    actions: ["Normal Attack", "Recover", "Revive", "Heal", "Buff", "Cleanse", "Power Heal", "Power Buff"]
  },
  {
    lookup: "harmonic-magic",
    name: "Harmonic Magic",
    color: "#36a5e8",
    image: "https://terrarp.com/db/mastery/w-harmonic.png",
    save: "will",
    expertise: "presence",
    actions: ["Normal Attack", "Recover", "Revive", "Heal", "Buff", "Cleanse", "Power Heal", "Power Buff"]
  },
  {
    lookup: "magitech",
    name: "Magitech",
    color: "#5c6779",
    image: "https://terrarp.com/db/mastery/w-magitech.png",
    save: "reflex",
    expertise: "knowledge",
    actions: ["Normal Attack", "Recover", "Revive", "Heal", "Buff", "Cleanse", "Power Heal", "Power Buff"]
  },
  {
    lookup: "nature-magic",
    name: "Nature Magic",
    color: "#91c023",
    image: "https://terrarp.com/db/mastery/w-nature.png",
    save: "will",
    expertise: "awareness",
    actions: ["Normal Attack", "Recover", "Revive", "Heal", "Buff", "Cleanse", "Power Heal", "Power Buff"]
  },
  {
    lookup: "spirit-magic",
    name: "Spirit Magic",
    color: "#50c8cb",
    image: "https://terrarp.com/db/mastery/w-spirit.png",
    save: "will",
    expertise: "awareness",
    actions: ["Normal Attack", "Recover", "Revive", "Heal", "Buff", "Cleanse", "Power Heal", "Power Buff"]
  },
  {
    lookup: "aura",
    name: "Aura",
    color: "#e0b439",
    image: "https://terrarp.com/db/mastery/w-aura.png",
    save: "-",
    expertise: "-",
    actions: ["Defense Enhancement", "Alter Hinder", "Guard", "Protect", "Hinder", "Reckless Attack", "Ultra Protect", "Ultra Hinder"]
  },
  {
    lookup: "battle-spirits",
    name: "Battle Spirits",
    color: "#b72c2c",
    image: "https://terrarp.com/db/mastery/w-battle-spirits.png",
    save: "-",
    expertise: "-",
    actions: ["Damage Enhancement", "Movement Enhancement", "Steady", "Hinder", "Ultra Hinder", "Burst Attack", "Critical Attack", "Reckless Attack"]
  },
  {
    lookup: "corrupt",
    name: "Corrupt",
    color: "#813090",
    image: "https://terrarp.com/db/mastery/w-corrupt.png",
    save: "-",
    expertise: "-",
    actions: ["Damage Enhancement", "Support Enhancement", "Steady", "Hinder", "Ultra Hinder", "Burst Attack", "Critical Attack", "Reckless Attack"]
  },
  {
    lookup: "dynamism",
    name: "Dynamism",
    color: "#87ad3d",
    image: "https://terrarp.com/db/mastery/w-dynamism.png",
    save: "-",
    expertise: "-",
    actions: ["Speed Enhancement", "Guard", "Hinder", "Ultra Hinder", "Burst Attack", "Critical Attack", "Reckless Attack"]
  },
  {
    lookup: "evoke",
    name: "Evoke",
    color: "#50c8cb",
    image: "https://terrarp.com/db/mastery/w-evoke.png",
    save: "-",
    expertise: "-",
    actions: ["Damage Enhancement", "Support Enhancement", "Steady", "Hinder", "Ultra Hinder", "Burst Attack", "Critical Attack", "Reckless Attack"]
  },
  {
    lookup: "hyper-sense",
    name: "Hyper Sense",
    color: "#40883a",
    image: "https://terrarp.com/db/mastery/w-hyper-sense.png",
    save: "-",
    expertise: "-",
    actions: ["Damage Enhancement", "Defense Enhancement", "Hinder", "Protect", "Guard", "Ultra Hinder", "Ultra Protect", "Critical Attack"]
  },
  {
    lookup: "mend",
    name: "Mend",
    color: "#2f8cc1",
    image: "https://terrarp.com/db/mastery/w-mend.png",
    save: "-",
    expertise: "-",
    actions: ["Support Enhancement", "Revive", "Heal", "Buff", "Cleanse", "Power Heal", "Power Buff", "Reckless Attack"]
  },
  {
    lookup: "metamorph",
    name: "Metamorph",
    color: "#cc4e71",
    image: "https://terrarp.com/db/mastery/w-metamorph.png",
    save: "-",
    expertise: "-",
    actions: ["Damage Enhancement", "Movement Enhancement", "Steady", "Hinder", "Ultra Hinder", "Burst Attack", "Critical Attack", "Reckless Attack"]
  },
  {
    lookup: "summon",
    name: "Summon",
    color: "#4a4da5",
    image: "https://terrarp.com/db/mastery/w-summon.png",
    save: "-",
    expertise: "-",
    actions: ["Damage Enhancement", "Alter Hinder", "Hinder", "Steady", "Guard", "Ultra Hinder", "Burst Attack", "Reckless Attack"]
  },
  {
    lookup: "weapon-arts",
    name: "Weapon Arts",
    color: "#cb5050",
    image: "https://terrarp.com/db/mastery/w-weapon-arts.png",
    save: "-",
    expertise: "-",
    actions: ["Damage Enhancement", "Alter Hinder", "Hinder", "Steady", "Guard", "Ultra Hinder", "Burst Attack", "Critical Attack"]
  },
]
