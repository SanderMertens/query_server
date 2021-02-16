var queries = [
  "Jedi",
  "Jedi, Male",
  "Jedi(X), Female(X)",
  "Family(X, Skywalker)",
  "Jedi(Yoda)",
  "Friends(HUMAN, DROID), Human(HUMAN), Droid(DROID)",
  "Friends(., X), Jedi(.), Jedi(X)",
  "Male, Droid",
  "Faction(X, Y), Droid(X)",
  "X(Y), IsA(X, Gender)",
  "LivedOn(X, Y), Planet(Y)",
  "Likes(X, Y), Likes(Y, X)",
  "Likes(Leia, Han)",
  "Likes(Rey, Finn)",
  "Friends(X, FRIEND), Becomes(FRIEND, BECOMES)",
  "X(Luke, Y)",
  "Droid",
  "Faction(X, FX), Faction(Y, FY), AtWar(FX, FY), Human(X), Human(Y)",
  "Kills(X, Y), Faction(Y, FACTION)",
  "X(Y, Skywalker)",
  "AppearsOn(X, ANewHope)",
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
