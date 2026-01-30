import { Column, Entity } from 'typeorm';

@Entity({ name: 'images', schema: 'images' })
export class Image {
  @Column()
  entity_id: number;

  @Column()
  entity_type: string;

  @Column()
  image_url: string;
}
