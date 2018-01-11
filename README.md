# linear-gradient.js

A tool for creating linear gradients programatically.

[Interactive demo](https://martyzz.github.io/linear-gradient/)

### Usage

```

<script src="js/linear-gradient.min.js">

<script>

  var colors = ["#000000", [255, 255, 255]];
  var steps = 3;
  var mode = linearGradient.OUTPUT_MODE_HEX;

  var gradient = linearGradient.generate(colors, steps, mode);

  // gradient -> ["#000000", "#808080", "#ffffff"]

</script>

```