import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'image', schema: 'image' })
export class Image {
  @Column()
  entity_id: number;

  @Column()
  entity_type: string;

  @Column()
  image_url: string;

  @PrimaryColumn()
  key: string;
}
