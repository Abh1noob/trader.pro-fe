import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IInstruments extends Document {
  short_name: string;
  company_name: string;
  exchange_code: string;
}

const instrumentsSchema = new Schema<IInstruments>({
  short_name: { type: String, required: true, unique: true },
  company_name: { type: String, required: true },
  exchange_code: { type: String, required: true },
});

// ✅ Correctly use the model name "Instrument" and explicitly specify the collection name "instruments"
const Instrument: Model<IInstruments> =
  mongoose.models.Instrument ??
  mongoose.model<IInstruments>("Instrument", instrumentsSchema, "instruments");

export default Instrument;
