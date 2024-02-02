//ny kode:
//Denne JS-koden er laget klar for deg. Den trenger du ikke endre på.
//Stats for heroes
let heroesArray = [
  {
    id: 0,
    name: "Henriette Healer",
    maxHP: 400,
    currentHP: 400,
    damage: 100,
    alive: true,
  },
  {
    id: 1,
    name: "Ariana archer",
    maxHP: 500,
    currentHP: 500,
    damage: 400,
    alive: true,
  },
  {
    id: 2,
    name: "Wyona Warrior",
    maxHP: 600,
    currentHP: 600,
    damage: 400,
    alive: true,
  },
];

let dragonObject = {
  name: "Daar Dragon",
  maxHP: 2000,
  currentHP: 2000,
  damage: 200,
  alive: true,
};

//Jeg lager en const for heltene våre, her bruker vi querry selector med.siden vi bruker klassenavnet "hero".
//legger til en eventListener med forEach.
//og click slik at noe skjer når vi trykker på helten vår:
const myHeroes = document.querySelectorAll(".hero");
//forEach går gjennom arrayet uten å lage et nytt.
myHeroes.forEach((hero, i) => {
  hero.addEventListener("click", function () {
    heroAttack(i);
  });
});

function heroAttack(heroIndex) {
  const chosenHero = heroesArray[heroIndex];
  // sjekk om dragen er død:
  if (dragonObject.currentHP <= 0) {
    return;
  }

  // sjekker om helten er død:
  if (chosenHero.currentHP <= 0) {
    return;
  }
  dragonObject.currentHP -= chosenHero.damage;

  alert(
    `${chosenHero.name} har gjort ${chosenHero.damage} skade på ${dragonObject.name}`
  );

  //helten gjør skade på dragen:
  showDragonHealth();

  //kaller på dragens motangrep:
  setTimeout(function () {
    randomCounterAttack();
  }, 250);
}

function randomCounterAttack() {
  // Sjekk om dragen er i live:
  if (dragonObject.currentHP <= 0) {
    return;
  }
  // Filtrer ut de heltene vi har som fremdeles lever:
  const aliveHeroes = heroesArray.filter((hero) => hero.currentHP > 0);
  //Sjekker om det finnes noen helter igjen å angripe og stopper om vi ikke har noen:
  if (aliveHeroes.length === 0) {
    return;
  }
  // Velger en tilfeldig helt å angripe:
  const randomHeroIndex = Math.floor(Math.random() * aliveHeroes.length);
  const randomHero = aliveHeroes[randomHeroIndex];
  // Dragen gjør skade på helten den angriper:
  randomHero.currentHP -= dragonObject.damage;
  alert(
    `${dragonObject.name} har angrepet ${randomHero.name} og gjort ${dragonObject.damage} i skade`
  );
  // Oppdaterer helsebaren til helten:
  updateHealthBars();
  // Sjekker om helten dør etter angrepet:
  if (randomHero.currentHP <= 0) {
    heroDeath(randomHero);
  }
}

//dragens healthbar:
function showDragonHealth() {
  //definerer dragens HP:
  const currentDragonHP = dragonObject.currentHP;
  const maxDragonHP = dragonObject.maxHP;
  //endrer verdien i p taggen vår:
  //const dragonHealthTxt = document.querySelector(".dragon-health-txt");
  //dragonHealthTxt.innerHTML = `${currentDragonHP} / ${maxDragonHP} HP`;
  //kjører nok en querry selector med . siden vi fremdeles bruker klassenavnet:
  const dragonHealthbar = document.querySelector(".dragon-health");
  const percentage = (currentDragonHP / maxDragonHP) * 100;
  dragonHealthbar.style.width = percentage + "%";
  //gjør slik at dragen kan gå i 0 men ikke i minus hp:
  dragonObject.currentHP = Math.max(0, dragonObject.currentHP);
  //om dragen har 0 i hp:
  dragonDeath();
}

//Du drepte dragen og vant spillet:
function dragonDeath() {
  if (dragonObject.currentHP <= 0) {
    //vi tar bort bildet av dragen:
    const dragonImage = document.querySelector(".dragon");
    if (dragonImage) {
      let darDragon = document.querySelector(".img-container.dragon-container");
      darDragon.remove();
      //sørger for at dragen forsvinner før du får meldingen om at du vant:
      setTimeout(function () {
        alert("Gratulerer! Du har vunnet spillet!");
      }, 250);
    }
  }
}

//Heltene blir borte om de dør
//koden er veldig repetativ, men når jeg forsøkte å forenkle den så virket ikke funksjonen.
//(i denne funksjonen fikk jeg hjelp av en i klassen til å forstå logikken)
function heroDeath() {
  //vi velger helten i arrayet og sjekker om hp er mindre ell lik 0:
  if (heroesArray[0].currentHP <= 0) {
    //vi linker bildet fra html via querySelector og . for klasse:
    let heroHealer = document.querySelector(".img-container.healer");
    if (heroHealer) {
      //her sørger vi for at bildet av helten blir borte:
      heroHealer.remove();
      //her satt jeg opp en timer så ikke alerten dukker opp før bildet  er borte:
      setTimeout(function () {
        alert(`${heroesArray[0].name} er ute av kampen!`);
      }, 250);
    }
  }

  if (heroesArray[1].currentHP <= 0) {
    let heroArcher = document.querySelector(".img-container.archer");
    if (heroArcher) {
      heroArcher.remove();
      setTimeout(function () {
        alert(`${heroesArray[1].name} er ute av kampen!`);
      }, 250);
    }
  }

  if (heroesArray[2].currentHP <= 0) {
    let heroWarrior = document.querySelector(".img-container.warrior");
    if (heroWarrior) {
      heroWarrior.remove();
      setTimeout(function () {
        alert(`${heroesArray[2].name} er ute av kampen!`);
      }, 250);
    }
  }
}
//Her oppdaterer jeg den grønne healthbaren:
function updateHealthBars() {
  heroesArray.forEach((hero) => {
    //her brukte jeg .split på arrayet for å targete rollen til heltene i navnet deres:
    const heroRole = hero.name.split(" ")[1].toLowerCase();
    const healthBar = document.querySelector(`.healthbar.${heroRole}-health`);

    if (healthBar) {
      const containerWidth = healthBar.parentElement.offsetWidth;
      let percentage = 0;

      if (hero.currentHP > 0) {
        percentage = (hero.currentHP / hero.maxHP) * containerWidth;
      }
      //jeg måtte bruke px istedenfor % her for å endre vidden på den grønne baren:
      healthBar.style.width = percentage + "px";
      // Om helten er død sett vidden av healthbaren til 0:
      if (hero.currentHP <= 0) {
        healthBar.style.width = "0px";
      }
    }
  });
  //her måtte jeg sette tiimeout slik at det grønne ble borte før youLost() alerten dukket opp:
  setTimeout(function () {
    youLost();
  }),
    250;
}
//du tapte spillet:
function youLost() {
  const allDeadHeroes = heroesArray.filter((hero) => hero.currentHP <= 0);
  const darLives = dragonObject.currentHP > 0;
  //her sjekker vi om alle heltene er døde, og om dragenn fremdeles lever:
  if (allDeadHeroes.length === 3 && darLives) {
    setTimeout(function () {
      alert("Du har tapt spillet!");
    }),
      250;
  }
}
