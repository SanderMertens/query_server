var queries = [
  "Jedi",
  "Droid",
  "Jedi, Male",
  "Jedi(X), Female(X)",
  "Jedi, Family(., X)",
  "Family(X, Skywalker)",
  "Jedi(Yoda)",
  "Male, Droid",
  "Likes(Leia, Han)",
  "Likes(Rey, Finn)",
  "X(Luke, Y)",
  "X(Y, Skywalker)",
  "Friends(HUMAN, DROID), Human(HUMAN), Droid(DROID)",
  "AppearsOn(X, ANewHope)",
  "Friends(., X), Jedi(.), Jedi(X)",
  "Faction(X, Y), Droid(X)",
  "X(Y), IsA(X, Gender)",
  "LivedOn(X, Y), Planet(Y)",
  "Likes(X, Y), Likes(Y, X)",
  "Friends(X, FRIEND), Becomes(FRIEND, BECOMES)",
  "Faction(X, FX), Faction(Y, FY), AtWar(FX, FY), Human(X), Human(Y)",
  "Kills(X, Y), Faction(Y, FACTION)",
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
