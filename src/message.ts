import { Effect, ParseResult, Schema, Struct } from "effect";
import { decodeHeaderFromUint8Array, Header } from "./header";
import { decodeQuestionFromDnsPacketCursor, Question } from "./question";
import {
	decodeResourceRecordFromDnsPacketCursor,
	ResourceRecord,
} from "./resource-record";
import { DnsPacketCursor } from "./types";

export type Message = Readonly<{
	header: Header;
	question: readonly Question[];
	answer: readonly ResourceRecord[];
	authority: readonly ResourceRecord[];
	additional: readonly ResourceRecord[];
}>;

export const Message = Schema.Struct({
	header: Header,
	question: Schema.Array(Question),
	answer: Schema.Array(ResourceRecord),
	authority: Schema.Array(ResourceRecord),
	additional: Schema.Array(ResourceRecord),
}).annotations({
	identifier: "Message",
	description: "A DNS Packet Message",
});

const HEADER_BYTE_LENGTH = 12;

export const MessageFromUint8Array = Schema.transformOrFail(
	Schema.Uint8ArrayFromSelf,
	Message,
	{
		strict: true,
		decode(uint8Array) {
			return Effect.gen(function* () {
				const cursor = DnsPacketCursor.fromUint8Array(uint8Array);

				// --- Header ---

				const headerUint8Array = uint8Array.subarray(
					cursor.offset,
					HEADER_BYTE_LENGTH,
				);

				const header = yield* decodeHeaderFromUint8Array(headerUint8Array);

				cursor.offset += HEADER_BYTE_LENGTH;

				// --- Questions ---
				let questions: Question[] = [];

				for (let idx = 0; idx < header.qdcount; idx++) {
					const { question, encodedByteLength } =
						yield* decodeQuestionFromDnsPacketCursor(cursor);

					questions.push(question);

					// Progress the cursor to the next question
					cursor.offset += encodedByteLength + 1;
				}

				console.log("HERE?");
				// --- Answers ---
				let answers: ResourceRecord[] = [];

				for (let idx = 0; idx < header.ancount; idx++) {
					const { resourceRecord: answer, encodedByteLength } =
						yield* decodeResourceRecordFromDnsPacketCursor(cursor);
					answers.push(answer);

					// Progress the cursor to the next question
					cursor.offset += encodedByteLength + 1;
				}

				// --- Nameserver Answers ---
				let authorityRecords: ResourceRecord[] = [];

				for (let idx = 0; idx < header.nscount; idx++) {
					const { resourceRecord: authorityRecord, encodedByteLength } =
						yield* decodeResourceRecordFromDnsPacketCursor(cursor);
					authorityRecords.push(authorityRecord);

					// Progress the cursor to the next question
					cursor.offset += encodedByteLength + 1;
				}

				// --- Additional ---
				let additionalRecords: ResourceRecord[] = [];

				for (let idx = 0; idx < header.arcount; idx++) {
					const { resourceRecord: additionalRecord, encodedByteLength } =
						yield* decodeResourceRecordFromDnsPacketCursor(cursor);
					additionalRecords.push(additionalRecord);

					// Progress the cursor to the next question
					cursor.offset += encodedByteLength + 1;
				}

				return {
					header,
					question: questions,
					answer: answers,
					authority: authorityRecords,
					additional: additionalRecords,
				};
			}).pipe(Effect.mapError(Struct.get("issue")));
		},
		encode(message, _, ast) {
			return ParseResult.fail(
				new ParseResult.Type(ast, message, "not implemented"),
			);
		},
	},
);
