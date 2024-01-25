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

// 1) Når brukeren trykker på en helt, skal denne helten angripe dragen:
function heroAttack(heroIndex) {
  const chosenHero = heroesArray[heroIndex];
  dragonObject.currentHP -= chosenHero.damage;

  //Her gjør vi slik at dragen kan gå i 0 men ikke i minus hp:
  //dragonObject.currentHP = Math.max(0, dragonObject.currentHP);

  showDragonHealth();

  alert(
    `${chosenHero.name} har gjort ${chosenHero.damage} skade på ${dragonObject.name}`
  );
}

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
}

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

// 2)  Dragen gjør et counter attack:
//needs more work!
function randomCounterAttack() {
  const randomAttack = Math.random();

  if (randomAttack < 1 / 3) {
    const chosenHeroIndex = Math.floor(Math.random * heroesArray.lenght);
    const chosenHero = heroesArray[chosenHeroIndex];
    chosenHero.currentHP -= dragonObject.damage;

    const heroHealthTxt = document.getElementById("hero-healt-txt"); //querry?
    heroHealthTxt.innerHTML = `${chosenHero / chosenHero.maxHP} HP`;
  }
}
