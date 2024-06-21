// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);
const iconSetting = (name) => (
  <SvgColor
    src={`/assets/icons/setting/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  setting: iconSetting("ic_setting"),
  blog: icon("ic_blog"),
  cart: icon("ic_cart"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),

  ventas: icon("ic_ventas"),
  compras: icon("ic_compras"),
  puntoVenta: icon("ic_puntoVenta"),
  inventario: icon("ic_inventario"),
  finanzas: icon("ic_finanzas"),
  contabilidad: icon("ic_contabilidad"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
  //     { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
  //     { title: 'file', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "Registros",
    items: [
      {
        title: "Registros",
        path: PATH_DASHBOARD.registro.regCliente,
        icon: ICONS.file,
        children: [
          { title: "clientes", path: PATH_DASHBOARD.registro.regCliente },
          { title: "citas", path: PATH_DASHBOARD.registro.regCitas },
          { title: "estilistas", path: PATH_DASHBOARD.registro.regEstilistas },
        ],
      },
    ],
  },
];

export default navConfig;
