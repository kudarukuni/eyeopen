const Menu = [
  { header: "General" },
  { 
    title: "Dashboard",
    group: "apps",
    visibility: true,
    icon: "dashboard"
  },
  {
    title: "My Personal Details",
    group: "apps",
    visibility: true,
    icon: "assignment",
    href: "/",
    target: "_self"
  },
  {
    title: "My Financial Account",
    group: "apps",
    visibility: true,
    icon: "account_balance_wallet",
    target: "_self",
    href: "/",
  },
  {
    title: "My Accounts",
    group: "apps",

    icon: "account_balance",
    items: [
      { name: "My Account", title: "Switch Account", group: "apps", target: "_self", component: "My Account" },
      {
        name: "add account",
        title: "Add Account",
        badge: "new",
        component: "add account"
      }
    ]
  },

  {
    title: "My Service Point",
    group: "apps",
    visibility: true,
    icon: "memory",
    target: "_self",
    name: "Service Point"
  },
  {
    title: "Service Statement",
    group: "apps",
    visibility: true,
    icon: "description",
    target: "_self",
    name: "Service Statement"
  },
 
  {
    title: "Meter Reading",
    visibility: true,
    group: "apps",
    icon: "event",
    target: "_self",
    name: "Meter Reading"
  },
  { name: "all bills", title: "My Bills", component: "all bills", icon: "style", visibility: true },
  { name: "all tokens", title: "My Tokens", component: "all tokens", icon: "ac_unit", visibility: true },
  {
    title: "eBilling",
    group: "apps",
    name: "eBilling",
    target: "_self",
    icon: "ballot"
  }
]
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase()
      let textB = y.title.toUpperCase()
      return textA < textB ? -1 : textA > textB ? 1 : 0
    })
  }
})

export default Menu