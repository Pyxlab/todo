import React from "react";
import { ListViewGroup } from "~/components/ListViewGroup";
import { SortBy } from "~/components/SortBy";


export const Hero: React.FC = () => {
    return (
        <div className="flex gap-2 items-center">
            <ListViewGroup />
            <div className="ml-auto">
                <SortBy />
            </div>
        </div>
    );
};
