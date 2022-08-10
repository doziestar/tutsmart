import { VotersCardInterface } from '@/interfaces/id.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

class VotersCard extends Model implements VotersCardInterface {
  public userId: string;
}

export default function (sequelize: Sequelize): typeof VotersCard {
  VotersCard.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      sequelize,
      tableName: 'voters_cards',
      timestamps: true,
      paranoid: true,
    },
  );
  return VotersCard;
}
