var queries = [
  "Jedi",
  "Droid",
  "Jedi, Male",
  "Jedi(X), Female(X)",
  "Jedi, Family(., X)",
  "Family(X, Skywalker)",
  "Jedi(Yoda)",
  "Machine",
  "Creature",
  "Satellite", 
  "Likes(Leia, Han)",
  "Likes(Rey, Finn)",
  "X(Luke, Y)",
  "X(Y, Skywalker)",
  "Likes(X, Y), Likes(Y, X)",
  "Kills(X, Y), Kills(Y, X)",  
  "IsA(X, Machine)",
  "IsA(X, SpaceShip)",
  "IsA(XWing, Machine)",
  "IsA(XWing, SpaceShip)",
  "IsA(XWing, Creature)",
  "IsA(Wookie, Creature)",   
  "Friends(HUMAN, DROID), Human(HUMAN), Droid(DROID)",
  "AppearsOn(X, ANewHope)",
  "Friends(., X), Jedi(.), Jedi(X)",
  "Faction(X, Y), Droid(X)",
  "X, IsA(X, Machine)",
  "LivedOn(X, Y), Planet(Y)",
  "Friends(X, FRIEND), Becomes(FRIEND, BECOMES)",
  "Kills(X, Y), Faction(X, FACTION), Faction(Y, FACTION)",
  "Parent(X, PARENT), Parent(Y, PARENT)",
  "LivedOn(X, Tatooine)"
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
      <div class="example" v-on:click="clicked()">
        example
      </div>
      `
  });
