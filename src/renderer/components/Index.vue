<template> 
  <div id="index">
    <div>
      <div id="grid">
        <div id="code">
          <div>
            <div id="pseudocode">
              <p>Set counter to zero</p>
              <p>Loop three times</p>
              <p>In the loop:</p>
              <ul>
                <li>Add one to counter</li>
                <li>Say Hello World</li>
                <li>Say counter</li>
              </ul> 
            </div> 
          <div id="javascript">
            <p>let counter = 0;</p>
            <p>for (let x = 0; x < 3; x++) {</p>
            <div class="indent">
              <p>counter++;</p>
              <p>console.log('Hello World');</p>
              <p>console.log(counter);</p>
            </div> 
            <p>}</p>
          </div> 
        </div></div> 
        <div id="info">
          <div>
            <h1 id="slogan">Write slicky, quickly.</h1>
            <p>Let's say you're trying to learn programming and are having some trouble understanding the basics. Control structures aren't quite making sense, and you don't really 'get' data types.</p>
            <p>This is where <strong>Braindead</strong> comes in! 🔥</p>
            <p><strong>Braindead</strong> generates clear, concise Python, JavaScript or Swift code that is modern, clean and functional... via basic English. 🤯</p>
            <router-link tag="button" to="/editor" @click.native="dimNav">Try it!</router-link> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  methods: {
    dimNav() {
      document.querySelector('nav').style.background = '#333';
      document.querySelector('nav p').style.color = '#c6d4ff';
      document.querySelector('nav i').style.color = '#c6d4ff';
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: 'Oswald', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#slogan {
  margin: 0;
}
#index {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 40px);
  text-align: left;
}
#grid {
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  grid-gap: 20px;
  margin: 20px;
  padding: 0;
}
#code {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#pseudocode {
  background: #4f65ad;
  color: #c6d4ff;
  padding: 20px;
}
#pseudocode p {
  color: #c6d4ff;
  margin: 5px;
}
#javascript {
  font-family: 'Inconsolata', monospace;
  background: #c6d4ff;
  color: #4f65ad;
  padding: 20px;
}
#javascript p {
  color: #4f65ad;
  margin: 5px;
}
#info {
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.indent {
  margin-left: 20px;
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
</style>
