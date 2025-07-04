import style from "@isentinel/eslint-config";

export default style({
  roblox: false,
  overrides: {
    typescript: {
      rules: {
        "shopify/prefer-class-properties": "off",
      },
    },
  },
});
