#!/usr/bin/env python
# coding: utf-8

# In[77]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


# In[78]:


# df=pd.read_csv("./student_info.csv")
# df


# # In[79]:


# df.head()


# # In[80]:


# df.tail()


# # In[81]:


# df.shape


# # In[82]:


# # df = df.drop(['Name'], axis=1)
# df.info()


# # In[83]:


# df.describe()


# # In[84]:


# df.isnull()


# # In[85]:


# df.isnull().sum()


# # In[86]:


# df.drop('Name',axis=1).mean()


# # In[87]:


# df2=df.fillna(df.drop('Name',axis=1).mean())


# # In[88]:


# df2.isnull().sum()


# # In[89]:


# plt.figure(figsize=(8,5))
# sns.barplot(x="Name",y="New_Predication",data=df2)
# plt.show()


# # In[104]:


# d_list = list(df2.columns.values)
# X=df2.drop(d_list[-1],axis="columns")
# X=X.drop("Name", axis='columns')
# y=df2.drop(d_list[0:len(d_list)-1], axis='columns')
# print(y)


# # In[105]:


# print("shape of X =",X.shape)
# print("shape of y =",y.shape)
# print (X)


# # In[106]:


# print (y)


# # In[107]:


# from sklearn.model_selection import train_test_split
# X_train,X_test,y_train,y_test= train_test_split(X,y,test_size=0.2,random_state=51) # taking 20% data for test. 20% is randomly
# print("shape of X_train =",X_train.shape)
# print("shape of y_train =",y_train.shape)
# print("shape of X_test =",X_test.shape)
# print("shape of y_test =",y_test.shape)

# from sklearn.linear_model import LinearRegression
# lr = LinearRegression()

# lr.fit(X_train,y_train)


# # In[108]:


# lr.coef_


# # In[109]:


# lr.intercept_


# # In[110]:


# y_pred = lr.predict(X_test)
# y_pred


# # In[111]:


# lr.score(X_test,y_test)


# # In[112]:


import joblib
# joblib.dump(lr, "Student_mark_prediction_model.pkl")


# In[113]:


model = joblib.load("Student_mark_prediction_model.pkl")


# In[115]:


model.predict([[19,98,28,22,52]])



