/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved. 
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *   
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *   
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi {
    import DisplayNameGetter = powerbi.data.DisplayNameGetter;

    export type EnumMemberValue = string | number;

    export interface IEnumMember {
        value: EnumMemberValue;
        displayName: DisplayNameGetter;
    }

    /** Defines a custom enumeration data type, and its values. */
    export interface IEnumType {
        /** Gets the members of the enumeration, limited to the validMembers, if appropriate. */
        members(validMembers?: EnumMemberValue[]): IEnumMember[];
    }

    export function createEnumType(members: IEnumMember[]): IEnumType {
        return new EnumType(members);
    }

    class EnumType implements IEnumType {
        private allMembers: IEnumMember[];

        constructor(allMembers: IEnumMember[]) {
            debug.assertValue(allMembers, 'allMembers');

            this.allMembers = allMembers;
        }

        public members(validMembers?: EnumMemberValue[]): IEnumMember[] {
            let allMembers = this.allMembers;
            if (!validMembers)
                return allMembers;

            let membersToReturn: IEnumMember[] = [];
            for (let member of allMembers) {
                if (_.contains(validMembers, member.value))
                    membersToReturn.push(member);
            }
            return membersToReturn;
        }
    }
}