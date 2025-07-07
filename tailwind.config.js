// tailwind.config.js
module.exports = {
  content: [
    "./**/*.{ts,tsx,js,jsx}", // ✅ Badge가 여기 들어 있어야 함
    "./components/**/*.{ts,tsx,js,jsx}", // ✅ 필요한 경우 명시적으로 추가
    "./components/Products/**/*.{ts,tsx}", // ✅ 이거 반드시 추가
  ],
  safelist: [
    "text-detailpage-price",
    "text-detailpage-originalprice",
    "text-order-price-normal",
    "text-order-price-cancel",
    "text-order-price-bold",
    "text-order-date",
    "text-small-cancel",
    "text-small-normal",
    "text-small-semibold",
    "text-micro",
    "text-ghost-tag",
    "text-button-regular",
    "text-main-menu-lined",
    "text-detailpage-reviewr-tag",
    "text-mypage-name",
    "text-mypage-medium",
    "text-mypage-mainmenu",
    {
      pattern: /^text-(small|order|detailpage|mypage)-[a-z-]+$/,
    },
  ],
};
