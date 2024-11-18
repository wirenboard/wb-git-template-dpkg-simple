var name_postfix = "-1";
var gen_vd_name = "vd-wall-switch" + name_postfix;

defineVirtualDevice(gen_vd_name, {
  title: {
    en: "Virt. wall switch" + name_postfix,
    ru: "Вирт. настенный выключатель" + name_postfix,
  },
  cells: {
    enabled: {
      title: "Статус выключателя" + name_postfix,
      type: "switch",
      value: false,
    },
  },
});
