import React from 'react';
import axiosInstance from "../axiosConfig";  export const fetchComment = async (postId, lastCommentId) => {   const baseEndpoint = `/open/comments/${postId}`;   const queryParams = new URLSearchParams();    if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);    const endpoint = queryParams.toString()     ? `${baseEndpoint}?${queryParams.toString()}`     : baseEndpoint;    console.log(endpoint);    try {     const response = await axiosInstance.get(endpoint);     if (response.data.status.code === 9999) {       return response.data.result;     } else {       throw new Error(         response.data.status.message || "?κ????κ±°??μ‘΄μ¬?μ? ?μ΅?λ€."       );     }   } catch (error) {     console.error("?κ? ?ΈμΆ μ€??λ¬κ° ?κ²Ό?΅λ??");     throw error;   } };  export const createComment = async (postId, content) => {   const body = {     postId: postId,     content: content.trim(),   };    try {     const result = await axiosInstance.post(`/api/comments/write`, body);     return result.data;   } catch (error) {     console.error("?κ? ?μ±???μ? λͺ»ν??΅λ??: ", error);     throw error;   } };  export const deleteComment = async (commentId) => {   try {     const response = await axiosInstance.delete(`/api/comments/remove`, {       data: { commentId: commentId },     });     return response.data;   } catch (error) {     console.error("?κ? ?? λ₯??μ? λͺ»ν??΅λ??: ", error);   } };  export const editComment = async (commentId, content) => {   const body = {     commentId: commentId,     content: content.trim(),   };    try {     const response = await axiosInstance.post(`/api/comments/edit`, body);     if (response.data.status.code === 9999) {       return response.data;     }   } catch (error) {     console.error("?κ? ?μ ???μ? λͺ»ν??΅λ??: ", error);   } };  export const likeComment = async (likeComments, commentId) => {   const body = { targetId: commentId };    if (likeComments.has(commentId)) {     try {       const response = await axiosInstance.post(`/api/comments/unlike`, body);       if (response.data.status.code === 9999) {         console.log("μ’μ???λ΅ : ", response.data.code, response.data);         return response.data;       }     } catch (error) {       console.error("μ’μ?λ? μ·¨μ?μ? λͺ»ν??΅λ??: ", error);     }   } else {     try {       const response = await axiosInstance.post(`/api/comments/like`, body);       if (response.data.status.code === 9999) {         console.log("μ’μ??μ·¨μ ?λ΅ : ", response.data.code, response.data);         return response.data;       }     } catch (error) {       console.error("μ’μ?λ? λ°μ?μ? λͺ»ν??΅λ??: ", error);     }   } };  export const fetchReplyComment = async (commentId, lastCommentId) => {   const baseEndpoint = `/open/comments/replies/${commentId}`;   const queryParams = new URLSearchParams();    if (lastCommentId) queryParams.append("lastCommentId", lastCommentId);    const endpoint = queryParams.toString()     ? `${baseEndpoint}?${queryParams.toString()}`     : baseEndpoint;    try {     const response = await axiosInstance.get(endpoint);     if (response.data.status.code === 9999) {       return response.data.result;     } else {       throw new Error(response.data.status.message || "λΆλ¬???κ????μ΅?λ€");     }   } catch (error) {     console.error("?΅κ???κ°?Έμ€μ§ λͺ»ν?΅λ??: ", error);   } };  export const createReplyComment = async (commentId, content) => {   const body = {     commentId: commentId,     content: content.trim(),   };    try {     const response = await axiosInstance.post(       `/api/comments/write/reply`,       body     );     if (response.data.status.code === 9999) {       return response.data;     }   } catch (error) {     console.error("?΅κ????μ±?μ? λͺ»ν??΅λ??: ", error);   } };
