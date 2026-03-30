import { computed } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
interface PermissionState {
    permissions: any[];
    loading: boolean;
    role : string ;
    id : number;
    firstName:string;
    lastName : string;
    gender : string ;
}
export const PermissionStore = signalStore(
    { providedIn: 'root' },
    withState<PermissionState>({ permissions: [], loading: false , role : '' , id : 0 , firstName :'' , lastName :'' , gender :''}),

    withMethods((store) => ({

        setMPermissions: (permissions: any[]) => {
            patchState(store, (state) => ({
                ...state,
                permissions: permissions
            }));
        },
       
        setRole: (role: string) => {
            patchState(store, (state) => ({
                ...state,
                role: role
            }));
        },
        setId:(id : number)=>{
            patchState(store, (state) => ({
                ...state,
                id: id
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
       
        setGender: (gender: string) => {
            patchState(store, (state) => ({
                ...state,
                gender: gender
            }));
        },
        setData:( id : number, lastName:string ,firstName : string ,
           role : string )=>{
            patchState(store, (state) => ({
                ...state,
                loading: true
            }));
            patchState(store, (state) => ({
                ...state,
                  id: id,
                lastName: lastName,
                firstName: firstName,
              
                role: role,
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
