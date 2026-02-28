<?php

function deleteFile(array $filepath): bool {
    for ($i = 0; $i < count($filepath); $i++) {
         if (file_exists($filepath[$i])) {
            if (unlink($filepath[$i])) {
                continue;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}