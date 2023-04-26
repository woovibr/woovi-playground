import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';

const Schema = new mongoose.Schema<IMessage>(
	{
		content: {
			type: String,
			description: 'The content of the message',
		},
	},
	{
		collection: 'Message',
		timestamps: true,
	}
);

export type IMessage = {
	content: string;
	createdAt: Date;
	updatedAt: Date;
} & Document;

export const Message: Model<IMessage> = mongoose.model('Message', Schema);
