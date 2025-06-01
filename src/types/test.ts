export interface Option {
    id: string; // e.g., "spot_1_a", "end_1_action_a"
    text: string;
    score?: number; // For "spot" phase: points awarded
    feedback?: string; // For "spot" phase: immediate explanation for this choice
    consequence_feedback?: string; // For "end" phase: explains outcome of choosing this action
  }
  
  export interface EmergencyContact {
    name: string;
    details: string; // e.g., phone number, short description
    url?: string;   // Optional link to their website
  }
  
  export interface DownloadableResource {
    text: string; // e.g., "Trainer-Leitfaden herunterladen"
    url: string;  // Path to the file
    fileName?: string; // Suggested filename for the download
  }
  
  export type QuestionType =
    | 'multiple_choice_score'     // Standard for "SEE IT": scenario, choices, score, feedback
    | 'multiple_choice_action'    // For "END IT": scenario, choose an action, get consequence feedback
    | 'information_guide'         // For "END IT": display step-by-step instructions
    | 'information_contacts'      // For "END IT": list emergency contacts/resources
    | 'download_resource';        // For "END IT": provide a download link
  
  export interface Question {
    id: string; // Unique ID, e.g., "spot_1", "end_scenario_2"
    phase: 'spot' | 'end'; // To differentiate between the two tests
    type: QuestionType;
    prompt: string; // The main scenario text, question, or informational title
    image_url?: string; // Optional: URL for an image to accompany the prompt/scenario
    level?: 1 | 2 | 3; // Optional: For 'spot' phase, to differentiate levels
    
    // Conditional properties based on 'type'
    options?: Option[]; // For 'multiple_choice_score' and 'multiple_choice_action'
    step_by_step_guide?: string[]; // For 'information_guide', array of steps
    emergency_contacts?: EmergencyContact[]; // For 'information_contacts'
    downloadable_resource?: DownloadableResource; // For 'download_resource'
  }
  
  // Interface for the entire questions data structure (array of Questions)
  export interface TestData {
    questions: Question[];
  }