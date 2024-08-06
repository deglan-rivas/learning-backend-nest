import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Pokemon {
  @Prop({ unique: true })
  name: string;

  @Prop({ unique: true })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
