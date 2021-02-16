
Vue.component('docs', {
    props: ['data'],
    template: `
      <div class="docs" v-if="!data">
        <p>
            Flecs Query Demo.
        </p>
        <p>
            This app lets you play with the new Flecs query language! Press the
            "Example" button to look at what kinds of queries are possible.
            Clearing the input will show this help again.
        </p>
        <p>
            Queries are lists of "terms" that specify constraints for one or more variables (upper-case identifiers).
            When a query is evaluated, it returns all combinations of variables for which
            the constraints return true. 
        </p>
        <p>
            A query term can have one of the following forms:
        </p>
        <p class="code-examples">
            Predicate  <span class="code-comment">// if no subject is provided, it is implicitly set to '.'</span><br/>
            Predicate(Subject) <span class="code-comment">// term with explicit subject, has no object </span><br/>
            Predicate(Subject, Object) <span class="code-comment">// term with explicit subject and object </span><br/>
        </p>
        <p>
            This (.) is a special variable that indicates which entities should be returned directly by the query. 
            An expression does not need a this variable, but including it can improve query performance, as it allows
            the query to yield a table in some cases.
        </p>
        <p>
            Here are a few simple query examples:
        </p>
        <p class="code-examples">
            Human    <span class="code-comment">// store instances of 'Human' in '.'</span><br/>
            Human(.) <span class="code-comment">// same as above</span><br/>
            Human(X) <span class="code-comment">// store instances of 'Human' in 'X'</span><br/>
            Friends(Luke, X) <span class="code-comment">// store friends of Luke in 'X'</span><br/>
            Friends(Luke, X), Jedi(X) <span class="code-comment">// store all friends of Luke that are Jedis in 'X'</span>
            Friends(X, Y) <span class="code-comment">// store all friends in 'X' and 'Y'</span><br/>
            Jedi(Luke) <span class="code-comment">// return true if Luke is a Jedi</span><br/>
        </p>
        <p>
            Here is a <a href="https://github.com/SanderMertens/query_server" target="blank">link to the project.</a>
        </p>
      </div>
      `
  });
