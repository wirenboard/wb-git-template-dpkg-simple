var name_postfix = "-1";
var gen_vd_name = "vd-water-meter" + name_postfix;

defineVirtualDevice(gen_vd_name, {
  title: {
    en: "Virt. water meter" + name_postfix,
    ru: "Вирт. счетчик воды" + name_postfix,
  },
  cells: {
    litres_used_value: {
      title: "Счетчик воды" + name_postfix,
      type: "value",
      value: 0,
    },
    click_button_plus: {
      title: "Инкремент +1",
      type: "pushbutton",
    },
    click_button_minus: {
      title: "Декремент -1",
      type: "pushbutton",
    },
  },
});

defineRule({
  whenChanged: [gen_vd_name + "/click_button_plus"],
  then: function (newValue, devName, cellName) {
    dev[gen_vd_name + "/litres_used_value"]++;
  },
});

defineRule({
  whenChanged: [gen_vd_name + "/click_button_minus"],
  then: function (newValue, devName, cellName) {
    dev[gen_vd_name + "/litres_used_value"]--;
  },
});
