<template>
  <!-- I wanted to finish this, didn't get around to it. -->
  <div id="visualContainer">
    <div id="grid">
      <div id="left">
        <div id="list">
          <div class="codeSection">
            <h3>Data</h3>
            <ul>
              <li @click="addCode('variable')"><i class="fas fa-pencil-alt"></i> Set variable...</li>
              <!-- <li><i class="fas fa-retweet"></i> Pick a random number...</li> -->
            </ul>
          </div>
          <div class="codeSection">
            <h3>Feedback</h3>
            <ul>
              <li @click="addCode('say')"><i class="fas fa-comment"></i> Say something...</li>
              <!--<li><i class="fas fa-keyboard"></i> Ask the user for input...</li>-->
            </ul>
          </div>
          <div class="codeSection">
            <h3>Loops</h3>
            <ul>
              <li @click="addCode('iterate')"><i class="fas fa-list-ol"></i> For x in y...</li>
              <li @click="addCode('iterate2')"><i class="fas fa-hourglass"></i> Loop x times...</li>
              <li @click="addCode('infinite')"><i class="fas fa-clock"></i> Loop forever</li>
              <li @click="addCode('end')"><i class="fas fa-times"></i> End the loop</li>
            </ul>
          </div>
        </div>
        <div id="options">
          <router-link tag="button" to="/editor" id="editor">Return...</router-link>
          <button id="reset" @click="reset">Reset</button>
        </div>
      </div>
      <div id="right">
        <div id="visual">
          <p v-show="visualInput.length === 0">Click on the buttons in the left column to populate your program.</p>
          <code-item v-for="item in visualInput" :key="item.id" :attr="item.attr"></code-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeItem from './Visual/CodeItem';

export default {
  name: 'visual',
  data() {
    return {
      visualInput: [],
      isPythonActive: 'inactive',
      isJavaScriptActive: 'active',
      isSwiftActive: 'inactive',
      pseudocode: '',
      issues: [],
    };
  },
  components: {
    CodeItem,
  },
  methods: {
    addCode(type) {
      this.visualInput.push(
        {
          attr: {
            type,
          },
        },
      );
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
        // Printing
        if (keyword === 'say') {
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
        // Loops
        } else if (keyword === 'loop') {
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
        // Ending Loop(s)
        } else if (keyword === 'end' || keyword === 'stop' || keyword === 'done') {
          // Remove the last 12 characters in the indent.
          // Remember: One indent = '&nbsp;' = 6 characters. This is rendered as one space.
          // The string isn't just made empty because the indentation
          // may be deeper than just two spaces.
          this.indent = this.indent.slice(0, -12);
          // Python does not use braces/similar to symbolise looping, so no worries here.
          this.jsOutput.push(`${this.indent}};`);
          this.swiftOutput.push(`${this.indent}}`);
        // Variables.
        // Check if a keyword is used to declare a variable
        } else if (keyword === 'set' || keyword === 'declare' || keyword === 'define') {
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
        } else if (
          // If the user is annoying and makes their keyword the variable name. Example: 'x is 4'
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
        // Mathematics
        } else if (keyword === 'add' || keyword === 'plus') {
          // Expected syntax: Add 5 to x
          const val = lineArray[1];
          const val2 = lineArray[3];
          this.pythonOutput.push(`${val} += ${val2}`);
          this.jsOutput.push(`${val} += ${val2};`);
          this.swiftOutput.push(`${val} += ${val2}`);
        } else if (keyword === 'subtract' || keyword === 'minus') {
          // Expected syntax: Subtract 5 from x
          const val = lineArray[1];
          const val2 = lineArray[3];
          this.pythonOutput.push(`${val} -= ${val2}`);
          this.jsOutput.push(`${val} -= ${val2};`);
          this.swiftOutput.push(`${val} -= ${val2}`);
        } else if (keyword === 'multiply' || keyword === 'times') {
          // Expected syntax: Multiply x by 5
          const val = lineArray[1];
          const val2 = lineArray[3];
          this.pythonOutput.push(`${val} *= ${val2}`);
          this.jsOutput.push(`${val} *= ${val2};`);
          this.swiftOutput.push(`${val} *= ${val2}`);
        } else if (keyword === 'divide' || keyword === 'split') {
          // Expected syntax: Multiply x by 5
          const val = lineArray[1];
          const val2 = lineArray[3];
          this.pythonOutput.push(`${val} /= ${val2}`);
          this.jsOutput.push(`${val} /= ${val2};`);
          this.swiftOutput.push(`${val} /= ${val2}`);
        // If the user doesn't enter a valid keyword OR doesn't declare a variable the annoying way
        } else {
          issues.push(
            `Unrecognised keyword used: '${keyword}'. If you meant to say something prefix your phrase with 'say'.`,
          );
          this.saturatedProblems = 'saturatedButton';
          this.problemsLabel = 'Actual Issue(s)';
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
    reset() {
      this.visualInput = [];
    },
  },
};
</script>

<style scoped>
#visualContainer {
  height: calc(100vh - 40px);
}
#grid {
  width: 100%;
  display: grid;
  height: 100%;
  grid-template-columns: 0.7fr 1fr;
}
#list {
  background: #4f65ad;
  color: #c6d4ff;
  height: calc(90% - 40px);
  padding-top: 20px;
  padding-bottom: 20px;
}
#list h3 {
  margin: 0;
}
#options {
  height: 10%;
  display: flex;
  background: #4f65ad;
}
#options button {
  height: 100%;
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
#right {
  max-height: 100%;
  background: #c6d4ff;
  overflow: auto;
}
#visual {
  color: #4f65ad;
  height: calc(100% - 10px);
  padding-top: 10px;
}
#visual p {
  color: #4f65ad;
  font-size: 1rem;
  width: 80%;
  margin-left: 20px;
  line-height: 1.5;
  margin-top: 10px;
}
.codeSection {
  margin-left: 20px;
}
.codeSection ul {
  list-style-type: none;
  padding-left: 10px;
}
.codeSection li {
  display: table;
  background: #c6d4ff;
  color: #4f65ad;
  padding: 5px;
  margin-bottom: 5px;
}
.codeSection li:hover {
  cursor: pointer;
}
h3 {
  font-size: 1.3rem;
  margin-bottom: 0;
}
#output {
  background: #7a82ab;
  height: 40%;
}
</style>
