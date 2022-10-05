export interface IScore {
  filter_id: string;
  value: string;
}
export interface IScores {
  question_id: string;
  scores: IScore[]
}