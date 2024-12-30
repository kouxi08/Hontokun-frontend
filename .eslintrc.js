module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
  },
  extends: [
    "plugin:vue/vue3-recommended"
  ],
  plugins: [
    'vue'
  ],
  rules: {
<<<<<<< HEAD
    // 'vue/comment-directive': 'error',
    // 'vue/jsx-uses-vars': 'error',
    // 'vue/multiline-html-element-content-newline': 'off',
    // 'vue/singleline-html-element-content-newline': 'off',
    // 'vue/max-attributes-per-line': ['warn', {
    //   singleline: 5, // 1行に許容される最大属性数
    //   multiline: 1   // 複数行での属性数
    // }],
    // 'vue/html-closing-bracket-spacing': ['error', {
    //   startTag: 'never',
    //   endTag: 'never',
    //   selfClosingTag: 'always'
    // }],
    // 'vue/html-self-closing': ['error', {
    //   html: {
    //     void: 'always', // void要素は自己閉じ
    //     normal: 'never', // 通常要素は閉じタグを使用
    //     component: 'always' // コンポーネントは自己閉じ
    //   }
    // }]
=======
    'vue/comment-directive': 'error',
    'vue/jsx-uses-vars': 'error',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': ['warn', {
      singleline: 5, // 1行に許容される最大属性数
      multiline: 5   // 複数行での属性数
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always'
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always', // void要素は自己閉じ
        normal: 'never', // 通常要素は閉じタグを使用
        component: 'always' // コンポーネントは自己閉じ
      }
    }],
    "vue/html-closing-bracket-newline": [
    "error",
    {
      "singleline": "never",
    }],
>>>>>>> origin/develop
  }
}
