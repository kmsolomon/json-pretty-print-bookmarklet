javascript: (() => {
  let prettyPrintStyles = {
    key: {
      color: "#333",
      rule: ".key {color: {{color}};}",
    },
    bool: {
      color: "#008605",
      rule: ".bool {color: {{color}};}",
    },
    number: {
      color: "#d8009d",
      rule: ".number {color: {{color}};}",
    },
    string: {
      color: "#5c2cb8",
      rule: ".string {color: {{color}};}",
    },
    nullVal: {
      color: "#d80000",
      rule: ".null-val {color: {{color}};}",
    },
  };

  function prettyPrint(parent, obj) {
    let wrapper = document.createElement("div");
    let jsonStr = JSON.stringify(JSON.parse(obj), null, 4);
    jsonStr = jsonStr.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
    jsonStr = jsonStr.replace(/(?<!\"\s?\w*)(true|false)(?!\s?\w*\")/gi, `<span class="bool">$1</span>`);
    jsonStr = jsonStr.replace(/(?<=".*"\: ?)([0-9]+)/gi, `<span class="number">$1</span>`);
    jsonStr = jsonStr.replace(/(?<=".*"\: ?)(null)/gi, `<span class="null-val">$1</span>`);
    jsonStr = jsonStr.replace(/(?<=".*"\: ?)(\".*\")/gi, `<span class="string">$1</span>`);
    jsonStr = jsonStr.replace(/(".*")(?=\:)/gi, `<span class="key">$1</span>`);
    wrapper.classList.add("pretty-print-wrapper");
    wrapper.innerHTML = jsonStr;
    parent.innerHTML = wrapper.innerHTML;
  }

  function addStyles() {
    let docStyleSheet = window.document.styleSheets[0];
    for (style in prettyPrintStyles) {
      docStyleSheet.insertRule(
        prettyPrintStyles[style].rule.replace(
          "{{color}}",
          prettyPrintStyles[style].color
        ),
        docStyleSheet.cssRules.length
      );
    }
  }

  if (document.querySelector(".pretty-print-wrapper") === null) {
    let styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);
    addStyles();
    document.querySelectorAll("pre").forEach((pre) => {
      prettyPrint(pre, pre.innerText);
      pre.classList.add("pretty-print-wrapper");
    });
  }
})();
