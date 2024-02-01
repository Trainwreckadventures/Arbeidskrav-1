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
    damage: 0,
    alive: true,
  },
  {
    id: 2,
    name: "Wyona Warrior",
    maxHP: 600,
    currentHP: 600,
    damage: 0,
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

  //helten gjør skade på dragen:
  showDragonHealth();

  // vi kaller på dragens motangrep:
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
  //Her gjør vi slik at dragen kan gå i 0 men ikke i minus hp:
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
      console.log(`HealerHP: ${heroesArray[0].currentHP}`);
      setTimeout(function () {
        alert(`${heroesArray[0].name} er ute av kampen!`);
      }, 250);
    }
  }

  if (heroesArray[1].currentHP <= 0) {
    let heroArcher = document.querySelector(".img-container.archer");
    if (heroArcher) {
      heroArcher.remove();
      console.log(`ArcherHP: ${heroesArray[1].currentHP}`);
      setTimeout(function () {
        alert(`${heroesArray[1].name} er ute av kampen!`);
      }, 250);
    }
  }

  if (heroesArray[2].currentHP <= 0) {
    let heroWarrior = document.querySelector(".img-container.warrior");
    if (heroWarrior) {
      heroWarrior.remove();
      console.log(`WarriorHP: ${heroesArray[2].currentHP}`);
      setTimeout(function () {
        alert(`${heroesArray[2].name} er ute av kampen!`);
      }, 250);
    }
  }
}
//løste problemet med Arianas healthbar:
function updateHealthBars() {
  heroesArray.forEach((hero) => {
    const heroRole = hero.name.split(" ")[1].toLowerCase();
    const healthBar = document.querySelector(`.healthbar.${heroRole}-health`);

    if (healthBar) {
      const containerWidth = healthBar.parentElement.offsetWidth;
      let percentage = 0;

      if (hero.currentHP > 0) {
        percentage = (hero.currentHP / hero.maxHP) * containerWidth;
      }

      healthBar.style.width = percentage + "px";

      // Om helten er død sett vidden av healthbaren til 0:
      if (hero.currentHP <= 0) {
        healthBar.style.width = "0px";
      }
    }
  });
}
//må finne en løsning for "du tapte alerten...husk å skru opp hp tin warrior og archer når du har fikset det!
