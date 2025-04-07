import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

// #region Role Model
export class Role extends Model {
  public id!: number;
  public name!: string;

  static associate() {
    Role.hasMany(User, { foreignKey: "role_id" });
  }
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "role",
    timestamps: false,
  }
);
// #endregion

/* #region User Model */
export class User extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public roleId!: number;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
      onDelete: "RESTRICT",
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
  }
);
/* #endregion */

/* #region UserInvitation Model */
export class UserInvitation extends Model {
  public id!: string;
  public name!: string;
  public weddingDate!: Date;
  public invitationStatus!: "inactive" | "active" | "expired";
  public userId!: string;
}

UserInvitation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    weddingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    invitationStatus: {
      type: DataTypes.ENUM("inactive", "active", "expired"),
      defaultValue: "inactive",
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  { sequelize, modelName: "user_invitation" }
);
/* #endregion */

/* #region PersonType Model */
export class PersonType extends Model {
  public id!: number;
  public name!: string;
}

PersonType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "person_type",
    timestamps: false,
  }
);
/* #endregion */

/* #region Person Model */
export class Person extends Model {
  public id!: string;
  public fullName!: string;
  public personTypeId!: number;
  public userInvitationId!: number;
}

Person.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullNName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "wedding_roles",
        key: "id",
      },
      onDelete: "RESTRICT",
    },
    userInvitationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user_invitations",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  { sequelize, modelName: "person" }
);
/* #endregion */

/* #region Guest Model */
export class Guest extends Model {
  public id!: string;
  public fullName!: string;
  public phone?: string;
  public respondStatus!: null | "sent" | "opened" | "available" | "unavailable";
  public userInvitationId!: string;
}

Guest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.CHAR(32),
      allowNull: true,
    },
    respondStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userInvitationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user_invitations",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "guests",
    modelName: "guest",
    timestamps: true,
  }
);
/* #endregion */

/* #region Wish Model */
export class Wish extends Model {
  public id!: number;
  public wish!: string;
  public guestId!: string;

  static associate() {
    Wish.belongsTo(Guest, { foreignKey: "guestId" });
  }
}

Wish.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wish: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    guestId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "guests",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "wish",
  }
);
/* #endregion */

/* #region Message Model */
export class Message extends Model {
  public id!: number;
  public message!: string;
  public userInvitationId!: string;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userInvitationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user_invitations",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  { sequelize, modelName: "message" }
);
/* #endregion */

/* #region Event Model */
export class Event extends Model {
  public id!: number;
  public name!: string;
  public date!: string;
  public locationName!: string;
  public locationAddress!: string;
  public locationUrl?: string;
  public userInvitationId!: string;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    locationName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    locationAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    locationUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    userInvitationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user_invitations",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "event",
    timestamps: false,
  }
);
/* #endregion */

/* #region Association/Relationship */
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role);

User.hasMany(UserInvitation, { foreignKey: "userId" });
UserInvitation.belongsTo(User);

PersonType.hasMany(Person, { foreignKey: "personTypeId" });
Person.belongsTo(PersonType);

UserInvitation.hasMany(Person, { foreignKey: "userInvitationId" });
Person.belongsTo(UserInvitation);

UserInvitation.hasMany(Guest, { foreignKey: "userInvitationId" });
Guest.belongsTo(UserInvitation);

Guest.hasMany(Wish, { foreignKey: "guestId" });
Wish.belongsTo(Guest);

UserInvitation.hasOne(Message, { foreignKey: "userInvitationId" });
Message.belongsTo(UserInvitation);

UserInvitation.hasMany(Event, { foreignKey: "userInvitationId" });
Event.belongsTo(UserInvitation);
/* #endregion */
