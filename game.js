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

  //her bruker vi && for å forsikre oss om at helten finnes og har over 0 i liv:
  if (randomHero && randomHero.currentHP > 0) {
    // Dragen gjør skade på helten:
    randomHero.currentHP -= dragonObject.damage;

    // Alert:
    alert(
      `${dragonObject.name} har angrepet ${randomHero.name} og gjort ${dragonObject.damage} i skade`
    );
    updateHealthBars();
  }
  heroDeath();
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

//Du drepte dragen og vant spillet:
function dragonDeath() {
  if (dragonObject.currentHP <= 0) {
    //vi tar bort bildet av dragen:
    const dragonImage = document.querySelector(".dragon");
    if (dragonImage) {
      setTimeout(function () {
        alert("Gratulerer! Du har vunnet spillet!");
        let darDragon = document.querySelector(
          ".img-container.dragon-container"
        );
        darDragon.remove();
      }, 100);
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

//her går det grønne nedover, men den grønne baren overflower litt (best I can do):
function updateHealthBars() {
  heroesArray.forEach((hero) => {
    //vi targeter heltens rolle med .split og [1]:
    const heroRole = hero.name.split(" ")[1].toLowerCase();
    const healthBar = document.querySelector(`.healthbar.${heroRole}-health`);

    if (healthBar) {
      const containerWidth = healthBar.parentElement.offsetWidth;
      const percentage = (hero.currentHP / hero.maxHP) * containerWidth;
      //jeg bruker px istedenfor % for det så ut til å fungere bedre når jeg endret størrelse på vinduet:
      healthBar.style.width = percentage + "px";
    }
  });
}
