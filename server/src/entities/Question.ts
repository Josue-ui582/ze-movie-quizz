import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  hash: string;

  @Field()
  @Column()
  actorName: string;

  @Field()
  @Column()
  actorId: number;

  @Field()
  @Column()
  movieTitle: string;

  @Field()
  @Column()
  movieId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  moviePoster: string;

  @Column()
  correctAnswer: boolean;

  @CreateDateColumn()
  createdAt: Date;
}