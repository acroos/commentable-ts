import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  authorEmail!: string;

  @Column()
  body?: string;
}
