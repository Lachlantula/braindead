<template>
  <!-- TODO: HUGE refactor. Need to modularise all of this significantly, and convert to SCSS. -->
  <div id="editor">
    <div id="grid">
      <div id="pseudocode">
        <textarea v-if="showPseudocode" id="pseudoInput" placeholder="Compose your pseudocode here, or alternatively click the 'Add...' button to visually generate your program." v-model="pseudocode" @keyup="mutateState()"></textarea>
        <div id="problemsHelpOutput" v-if="!showPseudocode">
          <div id="problemOutput" v-if="showProblems">
            <h1>Problems</h1>
            <ul v-if="issues.length !== 0">
              <li v-for="problem in issues" :key="problem.id">{{ problem }}</li>
            </ul>
            <p v-else>
              Hooray, no problems found! 🎉
            </p>
          </div>
          <div id="helpOutput" v-else>
            <h1>Help</h1>
            <article class="helpArticle" v-if="!help">
              <p>
                <strong>Braindead 🧠 </strong> is a program that compiles (converts, if you will) plain English words into correct Python,
                JavaScript and Swift code.
              </p>
              <p>
                If you're new to coding, this can all be very overwhelming... which is normal! Braindead actually intends to smoothen
                out the transition period between drag-and-drop coding and the real deal. 💁‍
              </p>
              <p>
                How does this all work, though? 🤔 I promise it's not as hard as it looks, but I like to encourage people to learn on their
                own; try different things - see what works, and what doesn't. 👩‍🔬
              </p>
            </article>
            <article class="helpArticle" v-else-if="help === 1">
              <p>👋 A brief interjection!</p>
              <p>Sorry to interrupt you this early on, but I'd just like to point out that the Help built into the Braindead app is
                a truncated and simplified version of the online documentation.
              </p>
              <p>If you want more information, examples, and awesomeness check it out 
                <a @click="const {shell} = require('electron'); shell.openExternal('https://lachlan.codes/braindead/docs')">here.</a> 😎</p>
            </article>
            <article class="helpArticle" v-else-if="help === 2">
              <p>
                Braindead is based around the idea of <strong>keywords</strong>, but this is a word that you'll see a lot in programming.
                <br>
                In Braindead, a 'keyword' is the first word on a line. 🎬
              </p>
              <p>
                Here's an example input:
              </p>
              <div class="code">
                say Hello world!
              </div>
              <p>
                In this instance, <em>say</em> is the keyword.
                <br>
                This will output to the following code in Python:
              </p>
              <div class="code">
                print('Hello world!')
              </div>
              <p>Thankfully, Braindead is capable of a lot more than just saying stuff. 😅</p>
            </article>
            <article class="helpArticle" v-else-if="help === 3">
               <p>
                Here's a few keywords to get you started: ✌️
              </p>
              <ul class="codeFont">
                <li>💬 say</li>
                <li>∞ loop</li>
                <li>✏️ set</li>
              </ul>
              <p>
                🤔 What do all these do, and how do you use them? Read on!
              </p>
            </article>
             <article class="helpArticle" v-else-if="help === 4">
               <p>
                💬 Let's go back to <span class="codeFont">say</span> for a moment, since it's the simplest.
              </p>
              <p>
                The <span class="codeFont">say</span> keyword 'prints' text onto your screen. This is not to be confused
                with printing something onto paper; 'printing' is a term used by programmers to describe a computer writing something
                on your screen.
              </p>
              <p>Examples:</p>
              <div class="code">
                say Hello world!
                <br>
                say I'm smart, and 'know how to deal with quotation markes and apostrophes.'
                <br>
                say "Even these!" Isn't that cool?
              </div>
            </article>
            <article class="helpArticle" v-else-if="help === 5">
               <p>
                 ∞ Let's check out the <span class="codeFont">loop</span> keyword now!
              </p>
              <p>
                Somewhat self-explanatory, the <span class="codeFont">loop</span> keyword does that; loops.
                But how?
              </p>
              <p>Check these examples to find out:</p>
              <div class="code">
                loop 5 times
                <br>
                say I'll appear 5 times!
                <br>
                end
                <br>
                <br>
                loop forever
                <br>
                say Never ending loop - use with caution!
                <br>
                end
              </div>
              <p>You can also do a loop, in a loop!</p>
              <div class="code">
                loop 10 times
                <br>
                say I'll appear 10 times.
                <br>
                loop 2 times
                <br>
                say I'll appear 20 times!
                <br>
                end
                <br>
                end
              </div>
            </article>
            <article class="helpArticle" v-else-if="help === 6">
               <p>
                  ️✏️ Let's look at <span class="codeFont">set</span>, and variables in programming.
              </p>
              <p>
                Variables are a topic that many new programmers have trouble understanding, and understandably so.
                To assist in building your understanding of what a variable is and <em>why</em> you would use one, I've penned a pretty long article
                about them over at the <a @click="const {shell} = require('electron'); shell.openExternal('https://lachlan.codes/braindead/docs/variables')">official documentation.</a> 👌
              </p>
              <p>In the mean time, here are some basic syntax examples that show you how to use variables in Braindead. 👏</p>
              <div class="code">
                set x to This is how you make a string (alphanumeric characters).
                <br>
                set y to 6
                <br>
                set pi to 3.14
                <br>
                set z to As you can see, strings, floats (numbers after the decimal point), and integers are the three currently supported data types.
                <br>
                <br>
                declare wow as There are other ways to make variables!
                <br>
                amazing is Hello world!
                <br>
                define coolVariable as This is the last one (for now).
              </div>
              <p>It is worth noting that immutable/constant declaration is not currently implemented. This is coming. If you don't know what this means,
                don't worry. 🌈
              </p>
            </article>
            <article class="helpArticle" v-else-if="help === 7">
               <p>
                 🙊 Due to your tenaciousness, let's quickly cover mathematics.
              </p>
              <p>
                I know! The keywords you'll see here aren't ones that I listed before; there's a reason I suggested you play around and see what works!
                This is just a cute reward for your commitment. 🎁
              </p>
              <p>Oh, and don't forget to check out the <a @click="const {shell} = require('electron'); shell.openExternal('https://lachlan.codes/braindead/docs')">full documentation</a> 
              for a complete tutorial API reference. 👍</p>
              <p>Here are a few examples of how to do basic arithmetic: 👩‍🏫</p>
              <div class="code">
                add 10 and 20
                <br>
                <br>
                subtract 5 and 2
                <br>
                <br>
                multiply 5 by 2
                <br>
                <br> 
                divide 32 by 8
              </div>
              <p>Pretty cool! However, I'd just like to point out that maths is still in beta, and some things may not work,
                including algebra and other complex maths, and sadly some oddly structured syntax (order of the words) can output unexpected code. 😔</p>
              <p>This WILL NOT work (yet): 😢</p>
              <div class="code">
                subtract 20 from 10
                <br>
                <br>
                9 = 2x + 3
              </div>
              <p>You may expected the output <span class="codeFont">-10</span> and <span class="codeFont">x = 3</span> when you run the code, but instead you'll get <span id="codeFont">10</span>.
              I'm working on fixing this, I promise! 🔥</p>
            </article>
            <p v-if="help !== 7">To continue on, press the <strong>Continue</strong> button below.</p>
            <p v-else>Thanks for reading! Make sure to update Braindead to receive new updates to this page! 😊</p>
          </div>
        </div>
        <div id="options">
          <router-link v-if="showPseudocode && addOption" tag="button" to="/visual" id="add">Add...</router-link> 
          <button v-if="showPseudocode && msdOption" id="msd" @click="msd()">MSD</button> 
          <button v-if="showPseudocode" :class="saturatedProblems" id="problems" @click="showProblems = true; pseudoToggle()">{{ problemsLabel }}</button>
          <button v-if="showPseudocode" id="help" @click="showProblems = false; pseudoToggle()">Help</button>
          <button v-if="!showProblems && !showPseudocode && help !== 7" id="continue" @click="help++;">Continue</button>
          <button v-if="!showProblems && !showPseudocode && help" id="back" @click="help--;">Back</button>
          <button v-if="!showPseudocode" id="return" @click="pseudoToggle()">Return</button>
        </div>
      </div>
      <div id="output">
        <div id="outputTabs">
          <button :id="isPythonActive" @click="isPythonActive = 'active';isJavaScriptActive = 'inactive';isSwiftActive = 'inactive';">Python</button>
          <button :id="isJavaScriptActive" @click="isPythonActive = 'inactive';isJavaScriptActive = 'active';isSwiftActive = 'inactive';">JavaScript</button>
          <button :id="isSwiftActive" @click="isPythonActive = 'inactive';isJavaScriptActive = 'inactive';isSwiftActive = 'active';">Swift</button>
        </div>
        <div id="outputContent">
          <div id="pythonOutput" v-if="isPythonActive === 'active'">
            <p v-for="line in pythonOutput" :key="line.id" v-html="line">
            </p>
          </div>
          <div v-if="isJavaScriptActive === 'active'">
            <p v-for="line in jsOutput" :key="line.id" v-html="line">
            </p>
          </div>
          <div v-if="isSwiftActive === 'active'">
            <p v-for="line in swiftOutput" :key="line.id" v-html="line">
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'editor',
  data() {
    return {
      pseudocode: '',
      variables: [],
      isPythonActive: 'inactive',
      isJavaScriptActive: 'active',
      isSwiftActive: 'inactive',
      issues: [],
      pythonOutput: ['# Go on, write some code!'],
      jsOutput: ['// Go on, write some code!'],
      swiftOutput: ['# Go on, write some code!'],
      indent: '',
      showPseudocode: true,
      saturatedProblems: false,
      problemsLabel: 'Problems',
      addOption: false,
      msdOption: false,
      showProblems: false,
      help: 0,
    };
  },
  components: {},
  methods: {
    mutateState() {
      // Vuex (state management stuff)
      this.$store.commit('UPDATE_PSEUDO', this.pseudocode); // Mutate the state, abides by strict mode
      this.translate(); // Run the translate function now that the pseudocode has been dealt with
    },
    translate() {
      const pseudocode = this.pseudocode;
      const pseudoLines = pseudocode.split('\n'); // Split the pseudocode into individual items in an array, one for each line.

      // Clear variables to ensure no unnecessary duplication/incorrect syntax.
      this.variables = []; // refers to variables mentioned throughout the input
      this.pythonOutput = [];
      this.jsOutput = [];
      this.swiftOutput = [];
      this.issues = [];
      this.saturatedProblems = false;
      this.indent = '';
      this.problemsLabel = 'Problems';

      const issues = this.issues;

      // Iterate through every line
      for (let line = 0; line < pseudoLines.length; line += 1) {
        // Split the current iteration (line) into an object, with each word being a new item
        const lineArray = pseudoLines[line].split(' ');
        // Find what the keyword is.
        const keyword = lineArray[0].toLowerCase();

        switch (keyword) {
          case 'say':
          case 'write':
          case 'output':
          case 'print': {
            const toSay = lineArray.slice(1).join(' ');
            // Check if single/double quotes are present.
            if (toSay.includes("'") && !toSay.includes('"')) {
              // Check if the string is surrounded with single quotes and is NOT just '
              if (toSay.startsWith("'") && toSay.endsWith("'") && toSay.length > 1) {
                if (!issues.includes("There's no need to surround what you want to say with quotation marks - Braindead handles that for you!")) {
                  issues.push(
                    "There's no need to surround what you want to say with quotation marks - Braindead handles that for you!",
                  );
                  this.saturatedProblems = 'saturatedButton';
                  this.problemsLabel = 'Potential Issue(s)';
                }
              }
              this.pythonOutput.push(`${this.indent}print("${toSay}")`);
              this.jsOutput.push(`${this.indent}console.log("${toSay}");`);
              // Swift strings cannot use single quotes, so this isn't a problem here.
              this.swiftOutput.push(`${this.indent}print("${toSay}")`);
            // Check if the string contains double/single quotes in any position
            } else if (toSay.includes('"') || toSay.includes("'")) {
              const toSayQuotesFixed = toSay.replace(/"/g, '\\"');
              this.pythonOutput.push(`${this.indent}print("${toSayQuotesFixed}")`);
              this.jsOutput.push(`${this.indent}console.log("${toSayQuotesFixed}");`);
              this.swiftOutput.push(`${this.indent}print("${toSayQuotesFixed}")`);
            // If there are no oddities concerning quotes
            } else {
              this.pythonOutput.push(`${this.indent}print('${toSay}')`);
              this.jsOutput.push(`${this.indent}console.log('${toSay}');`);
              this.swiftOutput.push(`${this.indent}print("${toSay}")`);
            }
            break;
          }

          case 'loop':
          case 'repeat': {
            // Find how many times the loop shall repeat
            const loopTimes = lineArray[1].toLowerCase();
            // Check if the user wants an indefinite loop
            if (
              loopTimes === 'forever' ||
              loopTimes === 'indefinitely' ||
              loopTimes === 'infinite' ||
              loopTimes === 'infinitely'
            ) {
              this.pythonOutput.push(`${this.indent}while True:`);
              this.jsOutput.push(`${this.indent}while (true) {`);
              this.swiftOutput.push(`${this.indent}while true {`);
            } else {
              // Create pre-test loop
              this.pythonOutput.push(`${this.indent}for _ in range(${loopTimes}):`);
              this.jsOutput.push(`${this.indent}for (let x = 0; x < ${loopTimes}; x++) {`);
              this.swiftOutput.push(`${this.indent}for x in 1...${loopTimes} {`);
            }
            // Increase indentation for readability
            this.indent += '&nbsp;&nbsp;'; // Two spaces
            break;
          }

          case 'end':
          case 'stop':
          case 'done':
          case 'break': {
            // Remove the last 12 characters in the indent.
            // Remember: One indent = '&nbsp;' = 6 characters. This is rendered as one space.
            // The string isn't just made empty because the indentation
            // may be deeper than just two spaces.
            this.indent = this.indent.slice(0, -12);
            // Python does not use braces/similar to symbolise looping, so no worries here.
            this.jsOutput.push(`${this.indent}};`);
            this.swiftOutput.push(`${this.indent}}`);
            break;
          }

          case 'set':
          case 'declare':
          case 'define': {
            // Obtain the second word on the line, which should be the variable name
            const varName = lineArray[1];
            // Add the variable name to the list of known variables
            this.variables.push(varName);
            // Find the value, which should be the 4th word (and beyond).
            // For example 'set x as Hello World'
            const val = lineArray.slice(3).join(' ');

            if (isNaN(val)) {
              // Variable value isn't a number.
              // Check if single/double quotes are present.
              if (val.includes("'") && !val.includes('"')) {
                if (val.startsWith("'") && val.endsWith("'")) {
                  if (!issues.includes("There's no need to surround what you want to say with quotation marks - Braindead handles that for you!")) {
                    issues.push(
                      "There's no need to surround the variable value with quotation marks - Braindead handles that for you!",
                    );
                    this.saturatedProblems = 'saturatedButton';
                    this.problemsLabel = 'Potential Issue(s)';
                  }
                }
                this.pythonOutput.push(
                  `${this.indent}${varName} = "${val}"`,
                );
                this.jsOutput.push(
                  `${this.indent}let ${varName} = "${val}";`,
                );
                // Swift strings cannot use single quotes, so this isn't a problem here.
                this.swiftOutput.push(
                  `${this.indent}var ${varName} = "${val}"`,
                );
              // Check if double quotes or single quotes are present.
              } else if (val.includes('"') && val.includes("'")) {
                const valQuotesFixed = val.replace(/"/g, '\\"');
                this.pythonOutput.push(
                  `${this.indent}${varName} = "${valQuotesFixed}"`,
                );
                this.jsOutput.push(
                  `${this.indent}let ${varName} = "${valQuotesFixed}";`,
                );
                this.swiftOutput.push(
                  `${this.indent}var ${varName} = "${valQuotesFixed}";`,
                );
              } else {
                this.pythonOutput.push(
                  `${this.indent}${varName} = '${val}'`,
                );
                this.jsOutput.push(
                  `${this.indent}let ${varName} = '${val}';`,
                );
                this.swiftOutput.push(
                  `${this.indent}var ${varName} = "${val}"`,
                );
              }
            } else {
              // Variable value is a number.
              this.pythonOutput.push(
                `${this.indent}${varName} = ${val}`,
              );
              this.jsOutput.push(
                `${this.indent}let ${varName} = ${val};`,
              );
              this.swiftOutput.push(
                `${this.indent}var ${varName} = ${val}`,
              );
            }
            break;
          }

          case 'add':
          case 'sum':
          case 'plus': {
            // Expected syntax: Add 5 to x
            const val = lineArray[1];
            const val2 = lineArray[3];
            this.pythonOutput.push(`${val} += ${val2}`);
            this.jsOutput.push(`${val} += ${val2};`);
            this.swiftOutput.push(`${val} += ${val2}`);
            break;
          }

          case 'subtract':
          case 'minus': {
            // Expected syntax: Subtract 5 from x
            const val = lineArray[1];
            const val2 = lineArray[3];
            this.pythonOutput.push(`${val} -= ${val2}`);
            this.jsOutput.push(`${val} -= ${val2};`);
            this.swiftOutput.push(`${val} -= ${val2}`);
            break;
          }

          case 'multiply':
          case 'times': {
            // Expected syntax: Multiply x by 5
            const val = lineArray[1];
            const val2 = lineArray[3];
            this.pythonOutput.push(`${val} *= ${val2}`);
            this.jsOutput.push(`${val} *= ${val2};`);
            this.swiftOutput.push(`${val} *= ${val2}`);
            break;
          }

          case 'divide':
          case 'split':
          case 'share': {
            // Expected syntax: Multiply x by 5
            const val = lineArray[1];
            const val2 = lineArray[3];
            this.pythonOutput.push(`${val} /= ${val2}`);
            this.jsOutput.push(`${val} /= ${val2};`);
            this.swiftOutput.push(`${val} /= ${val2}`);
            break;
          }

          default: {
            // If the user doesn't enter a valid keyword
            // OR doesn't declare a variable the annoying way

            issues.push(
              `Unrecognised keyword used: '${keyword}'. If you meant to say something prefix your phrase with 'say'.`,
            );
            this.saturatedProblems = 'saturatedButton';
            this.problemsLabel = 'Actual Issue(s)';
            break;
          }
        }

        // Variables (again)
        // If the user is annoying and makes their keyword the variable name. Example: 'x is 4'
        if (
          lineArray[1].toLowerCase() === 'is' ||
          lineArray[1] === '=' ||
          lineArray[1] === 'equals'
        ) {
          // Add the variable name to the list of known variables
          this.variables.push(keyword);
          // In this case the value is the 3rd item in the array
          const val = lineArray.slice(2).join(' ');
          if (isNaN(val)) {
            this.pythonOutput.push(
              `${this.indent}${keyword} = '${val}'`,
            );
            this.jsOutput.push(
              `${this.indent}let ${keyword} = '${val}';`,
            );
            this.swiftOutput.push(
              `${this.indent}var ${keyword} = "${val}"`,
            );
          } else {
            this.pythonOutput.push(
              `${this.indent}${keyword} = ${val}`,
            );
            this.jsOutput.push(
              `${this.indent}let ${keyword} = ${val};`,
            );
            this.swiftOutput.push(
              `${this.indent}var ${keyword} = ${val}`,
            );
          }
        }
      }

      // Check if illegal syntax is present.
      // prettier-ignore
      const illegal = this.pythonOutput.forEach((x) => { // eslint-disable-line
        // I picked Python because I felt like it. No real reasoning there.
        if (x.includes('<')) {
          if (!issues.includes('Sorry, using the less-than operator is illegal due to how Braindead works. This will be fixed with time - sorry for the inconvenience!')) {
            issues.push(
              'Sorry, using the less-than operator is illegal due to how Braindead works. This will be fixed with time - sorry for the inconvenience!',
            );
            this.saturatedProblems = 'saturatedButton';
            this.problemsLabel = 'Actual Issue(s)';
          }
          // Offer blaring feedback
          this.pythonOutput = ['<span style="color:#ff462d;"># Illegal string used. Check Problems.</span>'];
          this.jsOutput = ['<span style="color:#ff462d;">// Illegal string used. Check Problems.</span>'];
          this.swiftOutput = ['<span style="color:#ff462d;">// Illegal string used. Check Problems.</span>'];
        }
      });
    },
    // Synonym replacement
    msd() {
      axios.get('https://api.datamuse.com/words', {
        params: {
          ml: 'say',
        },
      })
        .then((response) => {
          console.log(JSON.stringify(response));
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
        // always executed
        });
    },
    // Navigation functionality
    pseudoToggle() {
      this.showPseudocode = !this.showPseudocode;
      this.help = 0;
    },
  },
  // On component load
  mounted() {
    // Vuex (state management) - 'saving' the pseudocode so that it persists,
    // even when a new route is visited
    this.pseudocode = this.$store.state.Pseudocode.pseudocode; // get the correct pseudocode value
    if (this.pseudocode !== '') {
      this.mutateState(); // If the user had already entered text previously, translate.
    }
    // Obtain saved preferences
    const Store = require('electron-store');
    const store = new Store();
    // Check developer preferences
    this.addOption = store.get('addOption');
    this.msdOption = store.get('msdOption');
  },
};
</script>

<style scoped lang="scss">
body {
  overflow: hidden;
}
#grid {
  width: 100%;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 0.7fr;
}
#editor {
  height: calc(100% - 40px);
}
#pseudocode {
  height: 100%;
}
#pseudoInput,
#problemsHelpOutput {
  background: $editor-bg;
  color: $editor-text;
  padding: 20px;
  height: calc(90% - 40px);
  font-size: 1.3rem;
  border: none;
  margin: 0;
  width: calc(100% - 40px);
  font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  vertical-align: top;
  resize: none;
  line-height: 1.5;
}
#pseudoInput::selection,
#problemsHelpOutput::selection {
  background: #333;
  color: #c6d4ff;
}
#pseudoInput::placeholder {
  color: #7a82ab;
}
#pseudoInput:focus {
  outline: none;
}
#problemsHelpOutput {
  font-size: 1rem;
  padding-right: 60px;
  max-height: 80vh;
  overflow: auto;
  width: calc(100% - 80px);
}
#problemsHelpOutput h1 {
  font-size: 1.3rem;
}
#problemsHelpOutput p {
  line-height: 1.5;
}
#problemsHelpOutput a {
  color: #a7a7a7;
}
#problemsHelpOutput a:hover {
  cursor: pointer;
}
#helpOutput {
  height: calc(90% - 20px);
}
.helpArticle {
  overflow: auto;
  height: calc(90% - 20px);
}
#output {
  background: #c6d4ff;
  height: 100%;
  font-size: 1rem;
}
#output p {
  color: #4f65ad;
  margin: 5px;
}
#outputTabs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
#outputContent {
  font-size: 1rem;
  padding: 20px;
  font-family: 'OperatorMonoLig-Book', 'Operator Mono', 'Fira Code',
    'Inconsolata', monospace;
  user-select: auto;
}
#outputContent p::selection {
  background: #7a82ab;
  color: #c6d4ff;
}
button {
  border: none;
  background: #4f65ad;
  color: #c6d4ff;
  font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 10px;
  font-size: 1rem;
  transition: all 0.2s linear;
}
button:focus,
button:hover {
  outline: none;
  color: #4f65ad;
  background: #c6d4ff;
  font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
button:hover {
  cursor: pointer;
}
.saturatedButton {
  background: #5f85fe;
  color: #fff;
}
#active {
  background: #c6d4ff;
  color: #4f65ad;
}
#inactive {
  background: #333;
}
#inactive:hover,
#inactive:focus {
  color: #7a82ab;
}
#active:hover {
  cursor: default;
}
.indent {
  margin-left: 20px;
}
#options {
  background: #4f65ad;
  display: flex;
  height: 10%;
}
#options button {
  height: 100%;
}
.code {
  font-family: 'OperatorMonoLig-Book', 'Operator Mono', 'Fira Code',
    'Inconsolata', monospace;
  padding: 1em;
}
.codeFont {
  font-family: 'OperatorMonoLig-Book', 'Operator Mono', 'Fira Code',
    'Inconsolata', monospace;
}
</style>
