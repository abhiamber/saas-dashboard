import { ModelStatic } from "sequelize";
import { UserInstance } from "./User";
import { WidgetInstance } from "./Widget";
import { TenantInstance } from "./Tenant";
import { DashboardInstance } from "./Dashboard";
import { PendingUserInstance } from "./PendingUser";



export interface DBModels {
    User: ModelStatic<UserInstance>;
    Widget: ModelStatic<WidgetInstance>;
    Tenant: ModelStatic<TenantInstance>;
    Dashboard: ModelStatic<DashboardInstance>;
    PendingUser: ModelStatic<PendingUserInstance>;
  }
  

