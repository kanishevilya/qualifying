export interface Tag {
    id: string;
    name: string;
}

export interface Group {
    id: string;
    name: string;
}

export interface Card {
    id: string;
    questions: string[];
    fact: string;
    tags: Tag[];
    groupIds: string[];
    groups?: Group[];
    remembered: boolean;
}

