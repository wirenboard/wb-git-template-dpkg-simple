var name_postfix = "-1";
var gen_vd_name = "vd-pump" + name_postfix;

defineVirtualDevice(gen_vd_name, {
  title: {
    en: "Virt. pump" + name_postfix,
    ru: "Вирт. насос" + name_postfix,
  },
  cells: {
    enabled: {
      title: "Статус насоса" + name_postfix,
      type: "switch",
      value: false,
    },
  },
});
