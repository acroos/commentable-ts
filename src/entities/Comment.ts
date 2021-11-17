import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: number;

  @Column()
  authorEmail!: string;

  @Column()
  body?: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;
}
