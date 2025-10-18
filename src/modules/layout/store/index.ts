import {create} from "zustand"


type Workspace = {
    id: string;
    name: string;
}


interface WorkspaceState {
    selectedWorkspace: Workspace | null;
    setSelectedWorkspace: (workspace: Workspace) => void
}


export const useWorkspacesStore = create<WorkspaceState>((set)=>({
    selectedWorkspace: null,

    setSelectedWorkspace: (workspace) =>
    set(() => ({ selectedWorkspace: workspace })),

}))