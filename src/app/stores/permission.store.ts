import { computed } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
interface PermissionState {
    permissions: any[];
    loading: boolean;
    entrepriseId : number ;
    entrepriseName : string;
    role : string ;
    idAgent : number;
    firstName:string;
    lastName : string;
    gender : string ;
}
export const PermissionStore = signalStore(
    { providedIn: 'root' },
    withState<PermissionState>({ permissions: [], loading: false , entrepriseId : 1 , entrepriseName :'' , role : '' , idAgent : 0 , firstName :'' , lastName :'' , gender :''}),

    withMethods((store) => ({

        setMPermissions: (permissions: any[]) => {
            patchState(store, (state) => ({
                ...state,
                permissions: permissions
            }));
        },
        setEntrepriseId: (id: number) => {
            patchState(store, (state) => ({
                ...state,
                entrepriseId: id
            }));
        },
        setRole: (role: string) => {
            patchState(store, (state) => ({
                ...state,
                role: role
            }));
        },
        setIdAgent:(id : number)=>{
            patchState(store, (state) => ({
                ...state,
                idAgent: id
            }));
        },
        setFirstName:(name: string) => {
            patchState(store, (state) => ({
                ...state,
                firstName: name
            }));
        },
        setLastName : (name: string) => {
            patchState(store, (state) => ({
                ...state,
                lastName: name
            }));
        },
        setEntrepriseName: (name: string) => {
            patchState(store, (state) => ({
                ...state,
                entrepriseName: name
            }));
        },
        setGender: (gender: string) => {
            patchState(store, (state) => ({
                ...state,
                gender: gender
            }));
        },
        setData:(entrepriseName: string ,lastName:string ,firstName : string , gender : string ,idAgent : number, entrepriseId : number , role : string , permissions:any[])=>{
            patchState(store, (state) => ({
                ...state,
                loading: true
            }));
            patchState(store, (state) => ({
                ...state,
                gender: gender,
                lastName: lastName,
                entrepriseName: entrepriseName,
                firstName: firstName,
                idAgent: idAgent,
                role: role,
                entrepriseId: entrepriseId,
                permissions: permissions,
                loading: false

            }));
         
        },
        checkPermission: (feature: string, subFeature: any) => {
            return store.permissions().some((p:any ) =>
                p.name === feature &&
                p.subFunctionRespDTOS.some((sub: any) => sub.name === subFeature)
            );
           
            // patchState(store, (state) => ({
            //   ...state,
            //   hasPermission: found
            // }));
        },
        loadPermissions() {

            console.log('Loading permissions...');

        },
    }))
);
