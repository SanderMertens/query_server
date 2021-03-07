var queries = [
  {q: "Jedi", desc: "Find all entities that are a Jedi"},
  {q: "Jedi, Male", desc: "Find all entities that are both Jedi and Male"},
  {q: "Jedi(X), Female(X)", desc: "Find all entities that are both Jedi and a Female"},
  {q: "Droid", desc: "Find all entities that are a Droid"},
  {q: "Human, Machine", desc: "Find all entities that are both Human and Machine"},
  {q: "IsA(X, Human), IsA(X, Machine)", desc: "Find everything that is a Human and a Machine"},
  {q: "Machine", desc: "Find all entities that are a Machine"},
  {q: "Satellite", desc: "Find all entities that are a Satellite"},
  {q: "IsA(X, Planet)", desc: "Find everything that is a Planet"},
  {q: "Planet", desc: "Find all entities that are a Planet"},
  {q: "Jedi, Family(., X)", desc: "Find all Jedis and their Families"},
  {q: "Family(X, Skywalker)", desc: "Find everyone in the Skywalker Family"},
  {q: "Jedi(Yoda)", desc: "Is Yoda a Jedi?"},
  {q: "Likes(Leia, Han)", desc: "Does Leia like Han?"},
  {q: "Likes(Leia, X)", desc: "Find everyone that Leia likes"},
  {q: "Likes(X, Leia)", desc: "Find everyone that likes Leia"},
  {q: "Likes(X, Rey)", desc: "Find everyone that likes Rey"},
  {q: "Likes(Rey, Finn)", desc: "Does Rey like Finn?"},
  {q: "Loves(Rey, Finn)", desc: "Does Rey love Finn?"},
  {q: "Loves(X, Y), Loves(Y, X)", desc: "Find everyone that Loves each other"},
  {q: "Likes(X, Y), Jedi(X)", desc: "Find all Jedis that likes someone"},
  {q: "Kills(X, Y), Kills(Y, X)", desc: "Find everyone that Kills each other"},
  {q: "IsA(Wookie, Creature)", desc: "Is a Wookie a Creature?"},
  {q: "IsA(Wookie, Machine)", desc: "Is a Wookie a Machine?"},
  {q: "Creature(Chewbacca)", desc: "Is Chewbacca a Creature?"},
  {q: "Machine(Chewbacca)", desc: "Is Chewbacca a Machine?"},
  {q: "Creature(Yoda)", desc: "Is Yoda a Creature?"},
  {q: "IsA(X, Transport)", desc: "Find everything that is a Transport"},
  {q: "IsA(SpaceShip, X)", desc: "Find everything that a SpaceShip is"},
  {q: "IsA(XWing, Creature)", desc: "Is an XWing a Creature?"},
  {q: "IsA(XWing, Machine)", desc: "Is an XWing a Machine?"},
  {q: "X(Chewbacca)", desc: "Find everything that Chewbacca is"},
  {q: "X(Chewbacca), IsA(X, Y)", desc: "Find everything that Chewbacca is and their supersets"},
  {q: "IsA(X, Sentient)", desc: "Find everything that is Sentient"},
  {q: "Sentient(Chewbacca)", desc: "Is Chewbacca Sentient?"},
  {q: "Sentient(Yoda)", desc: "Is Yoda Sentient?"},
  {q: "IsA(Wookie, Sentient)", desc: "Are Wookies sentient?"},
  {q: "IsA(SpaceShip, Sentient)", desc: "Are SpaceShips sentient?"},
  {q: "X(Luke, Y)", desc: "Find all relationships for Luke"},
  {q: "Parent(X, PARENT), Parent(Y, PARENT)", desc: "Find everyone with the same Parent"},
  {q: "Faction(X, F), AtWar(F, ENEMY), Human(X)", desc: "Find every human that belong to factions at war another faction"},
  {q: "Faction(Luke, FA), Faction(DarthVader, FB), AtWar(FA, FB)", desc: "Is Luke at war with Darthvader?"},
]

Vue.component('example', {
    data: function() {
      return {
        cur: 0
      }
    },
    methods: {
      clicked(e) {
        this.$emit('clicked', queries[this.cur % queries.length]);
        this.cur ++;
      }
    },
    template: `
      <div>
        <div class="example" v-on:click="clicked()">
          example
        </div>     
      </div>
      `
  });
