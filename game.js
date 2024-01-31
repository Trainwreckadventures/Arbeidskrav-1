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

//Jeg har valgt 3 som tilleggsfunksjonalitet
//lifebarens grønne farge blir mindre og mindre
//basert på current HP

const HenrietteHealerHealthBar = document.getElementsByClassName(
  "healthbar healer-health"
);
const ArianaArcherHealthBar = document.getElementsByClassName(
  "healthbar archer-health"
);
const WyonaWarriorHealthBar = document.getElementsByClassName(
  "healthbar warrior-health"
);

// 1) Når brukeren trykker på en helt, skal denne helten angripe dragen:

//Vi lager en const for heltene våre, her bruker vi querry selector med.siden vi bruker klassenavnet "hero" :
const myHeroes = document.querySelectorAll(".hero");
//Vi legger til en eventListener med forEach
//(foEach går gjennom arrayet uten å lage et nytt)
//og click slik at noe skjer når vi trykker på helten vår:
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

  // sjekk om helten er død:
  if (chosenHero.currentHP <= 0) {
    return;
  }
  dragonObject.currentHP -= chosenHero.damage;

  alert(
    `${chosenHero.name} har gjort ${chosenHero.damage} skade på ${dragonObject.name}`
  );
  updateHealthBars();
  //Her gjør vi slik at dragen kan gå i 0 men ikke i minus hp:
  dragonObject.currentHP = Math.max(0, dragonObject.currentHP);

  //helten gjør skade på dragen:
  showDragonHealth();

  // vi kaller på dragens motangrep:
  setTimeout(function () {
    randomCounterAttack();
  }, 250);
}

function randomCounterAttack() {
  //er dragen i live?:
  if (dragonObject.currentHP <= 0) {
    return;
  }
  //Her sørger vi for at dragen angriper en random helt:
  const randomHeroIndex = Math.floor(Math.random() * heroesArray.length);
  const randomHero = heroesArray[randomHeroIndex];

  //test:
  const randomHeroTekstFelt = test(randomHero);
  console.log("randomHeroTekstfelt");

  //her bruker vi && for å forsikre oss om at helten finnes og har over 0 i liv:
  if (randomHero && randomHero.currentHP > 0) {
    // Dragen gjør skade på helten:
    randomHero.currentHP -= dragonObject.damage;
    //debugtesting:
    console.log("randomHeroHP", randomHero, randomHero.currentHP);
    // Alert:
    alert(
      `${dragonObject.name} har angrepet ${randomHero.name} og gjort ${dragonObject.damage} i skade`
    );
    updateHealthBars();
  }
  heroDeath();
}
//testen vår for å  debugge helteproblemer:
function test(randomHerohero) {
  console.log("test", randomHerohero);
  const tekstFeltTekst = document.getElementById("warrior-health-txt");

  return tekstFeltTekst;
}

//dragons healthbar:
function showDragonHealth() {
  //Vi definerer dragens HP:
  const currentDragonHP = dragonObject.currentHP;
  const maxDragonHP = dragonObject.maxHP;

  //Vi endrer verdien i p taggen vår:
  const dragonHealthTxt = document.querySelector(".dragon-health-txt");
  dragonHealthTxt.innerHTML = `${currentDragonHP} / ${maxDragonHP} HP`;

  //Vi kjører nok en querry selector med . siden vi fremdeles bruker klassenavnet:
  const dragonHealthbar = document.querySelector(".dragon-health");
  const percentage = (currentDragonHP / maxDragonHP) * 100;
  dragonHealthbar.style.width = percentage + "%";
  //om dragen har 0 i hp:
  dragonDeath();
}

//Ok alerten fungerer her, hurra!
function dragonDeath() {
  if (dragonObject.currentHP <= 0) {
    //vi tar bort bildet av dragen:
    const dragonImage = document.querySelector(".dragon");
    if (dragonImage) {
      dragonImage.style.display = "none";
      alert("Gratulerer! Du har vunnet spillet!");
    }
  }
}

//Heltene blir borte om de dør (Her fikk jeg hjelp fra en i klassen til å komme i gang også bygget jeg vidre på det hun viste meg)
//koden er veldig repetativ så kanskje jeg finner en bedre løsning på det...
function heroDeath() {
  if (heroesArray[0].currentHP <= 0) {
    let heroHealer = document.querySelector(".img-container.healer");
    if (heroHealer) {
      heroHealer.remove();
      setTimeout(function () {
        alert(`${heroesArray[0].name} er ute av kampen!`);
      }, 250);
    }
  } else if (heroesArray[1].currentHP <= 0) {
    let heroArcher = document.querySelector(".img-container.archer");
    if (heroArcher) {
      heroArcher.remove();
      setTimeout(function () {
        alert(`${heroesArray[1].name} er ute av kampen!`);
      }, 250);
    }
  } else if (heroesArray[2].currentHP <= 0) {
    let heroWarrior = document.querySelector(".img-container.warrior");
    if (heroWarrior) {
      heroWarrior.remove();
      setTimeout(function () {
        alert(`${heroesArray[2].name} er ute av kampen!`);
      }, 250);
    }
  }
}
//dette fungerer ish, men føles veldig ducktape ut...
function updateHealthBars() {
  heroesArray.forEach((hero) => {
    //Her måtte jeg bruke split siden navnet i arrayet har navn og rolle (i html er bare rollen i class taggen):
    const heroRole = hero.name.split(" ")[1].toLowerCase();

    // Her velger vi healthbar basert på rolle(healer/archer/warrior);
    const healthBar = document.querySelector(`.healthbar.${heroRole}-health`);

    if (healthBar) {
      // her måtte jeg knote noe helt sinnsykt for å få det til å fungere:
      const percentage = (hero.currentHP / hero.maxHP) * 23.5;

      healthBar.style.width = percentage + "%";
    } else {
      console.error(`Health bar for ${hero.name} not found!`);
    }
  });
}
